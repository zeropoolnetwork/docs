# API

## Overview

Technically, the API fawkes-crypto provides for describing circuits for use in
R1CS and Plonk backends are different. Each is enabled using `r1cs` and `plonk`
Cargo features. In this section we start with high-level overview of their
common principles and then we dive into the concrete code examples of using
each in the later sections.

Fawkes-crypto API uses the following vocabulary for describing Constraint
Systems. The code examples we give here are have some technicalities (like
borrowing and wrapper types) simplified in them to convey the intuition — this
is best read as pseudocode. We will look at the formally correct, runnable
examples in the next sections.

 - `trait CS` describes the whole Constraint System. It has methods for
    allocating new variables in $\texttt{pub}$ and $\texttt{sec}$ as well as
    adding new constraints to the system.

    The field over which the `CS` constraints work is given by the associated
    type `CS::Fr`.

    Two main implementors of this trait are `struct BuildCS` and `struct
    DebugCS`. The former one is the format which proving and verifying
    functions accept, while the latter is useful for the circuit.

 - `struct CNum<CS>` is a reference to a specific variable in the CS. For
   example, if you allocate a new variable with

   ```rust
   fn CS::alloc(self, value: Option<CS::Fr>) -> CNum<CS>
   ```

   you get a return value of type `CNum<CS>`. If you're Prover, you should
   pass `value = Some(x)` to set this new variable's value to `x`. If you're
   Verifier, you pass `value = None` since you may not know the value of this
   variable (and it's not your job to compute it).

   If you want to enforce a constraint on some variables of your CS, you will
   also refer to the variables using `CNum<CS>`. For example, given `a, b, c :
   CNum<CS>`, to add the constraint $a \times b = c$ to your CS you may call a
   function like

   ```rust
   // a * b == c
   fn CS::enforce_mul(a: CNum<CS>, b: CNum<CS>, c: CNum<CS>);
   ```

   If you have a `x: CNum<CS>` that refers to a secret variable, i.e. one from
   $\texttt{sec}$, and you want to make it public moving it to $\texttt{pub}$
   you call

   ```rust
   fn CS::inputize(n: CNum<CS>);
   ```

   You can also do regular arithmetic operations on `CNum`s. This applies
   operations to the wires in the circuit model of our CS, creating new
   wires (and leaving input wires available for further use, of course). For
   example, if we have `a, b: CNum<CS>`, we can do `let c = a * b`. This will
   `alloc` a new variable for `c` (using the correct `value` derived as the
   product of values of `a` and `b`), and then do `enforce_mul(a, b, c)`.

 - `struct CBool<CS>` is just a regular `CNum<CS>` which was restricted (using
   a constraint) to hold only values 0 or 1 (in `CS::Fr`). It can be used for
   if-then-else/switch constructs which we will see shortly.

 - `trait Signal<CS>` generalizes `CNum<CS>`, `CBool<CS>` as well as [fixed-size
   vectors](https://github.com/zeropoolnetwork/fawkes-crypto/blob/master/fawkes-crypto/src/core/sizedvec.rs)
   and pairs of other `Signal`s. You can also implement `Signal` trait for
   your own types (such types will typically store some number of `CNum`s and
   `CBool`s in them).

   A `Signal<CS>` is something you can copy, test for equality with a
   `Signal<CS>` of the same type, allocate, inputize — all with a single call
   to the corresponding method.

   Since `Signal<CS>` is a generic type that circuit operates on, it can
   be passed in the "then" and "else" branches of the conditional "switch"
   operation:

   ```rust
   // Returns self if bit is true, if_else otherwise
   fn Signal::switch(&self, bit: CBool<C>, if_else: Self) -> Self
   ```

   You can do `let (x, y) = (a,b).switch(bit, (c, d))` to implement conditional
   assignment

   $$
     (x, y) = \begin{cases}
      (a, b) & \text{ if $\text{bit} = 1$} \\
      (c, d) & \text{ otherwise.}
     \end{cases}
   $$

   in your CS. This works because `(CNum<CS>, CNum<CS>)` is an instance of
   `Signal<CS>`.

 - `Num<Fp>` is a wrapper type for `Fp` field. We use it to implement traits
   for `Fp`. It's a rather technical detail, it's safe to view `Num::from(x)`
   as `x`.

Now we will look at more concrete (runnable) code examples that use R1CS and
Plonk constraints. They are enabled using either `r1cs` or `plonk` Cargo
flags. Once you enable one of the two flags, the corresponding definitions of
`CS`, `CNum`, `CBool` will appear in `cicuit::{cs, num, bool}`.

## Plonk Constraints

In Fawkes-crypto circuits are described as functions of type

```rust
circuit: Fn(Signal<BuildCS<Fr>>, Signal<BuildCS<Fr>>)
```

The two arguments are `pub` and `sec`. Their concrete types can be anything
that implements `Signal`, e.g. `CNum<_>`, `CBool<_>`, fixed-size vectors
of `CNum` or `CBool`. The `circuit` doesn't accept the `cs: BuildCS<Fr>`
itself, because `Signal<_>` values store smart reference to the CS value they
correspond to. Both `pub` and `sec` must, of course, belong to the same CS.

Note that `pub` and `sec` here can have different types. For example, you could
make `pub: (CNum<_>, CNum<_>)` and `sec: (CNum<_>, CNum<_>, CNum<_>)` to have 2
public inputs and 3 secret ones.

To verify a circuit using Plonk constraints (Halo2 backend with KZG10
commitments), one does the following steps.

1. Pick public parameters and generate Verifier and Prover keys.

   ```rust
   use fawkes_crypto::backend::plonk::{
     engines::Bn256,
     setup::setup,
     Parameters
   };

   // Generate parameters.
   //
   // The k=10 here is a parameter of KZG10 commitment scheme. See its paper
   // for details. And Bn256 is one of the available "engines" that
   // fawkes-crypto implements for Plonk; for details, see
   // backend::plonk::engines module.
   let parameters = Parameters::<Bn256>::setup(10);

   // Sample keys. The vk goes to Verifier, pk goes to Prover
   let (vk, pk) = setup(&parameters, circuit);
   ```

   This step is also called trusted setup. It must be executed either by a
   trusted third party or in a Secure Multi-Party Computation protocol, not by
   Prover or Verifier.

2. Generate the proof. This step is done by the Prover using the public inputs
   `pub` and secret input `sec`.

   ```rust
   use fawkes_crypto::backend::plonk::prover;

   let (inputs, proof) = prover::prove(
     &parameters,
     &pk,
     &pub,    // actual value of pub to pass to circuit
     &sec,    // actual value of sec to pass to circuit
     circuit,
   );
   ```

   Prover communicates both `inputs` and `proof` to the verifier. The `proof`
   is the $\texttt{proof}$ we've introduced before. And `inputs` is the list of
   all public inputs of the `circuit`, it will include both `pub` and all the
   other public inputs that `circuit` will create and assign values to duing
   its execution. It may contain some computation results that the Prover wants
   to reveal to the Verifier, for example.

3. Verify the proof. This is done by the Verifier.

   ```rust
   use fawkes_crypto::backend::plonk::verifier;

   let result: bool = verifier::verify(
     &parameters,
     &vk,
     &proof,
     &inputs,
   );
   ```

   This uses `proof` and `inputs` that Verifier got from the Prover.

Both `setup` and `prove` will call the `circuit` function that you pass to them
to build the circuit and extract the information they need from it.

## R1CS Constraints

R1CS constraints in fawkes-crypto are described with a function of the same
type as in Plonk (presented in the previous section):

```rust
circuit: Fn(Signal<BuildCS<Fr>>, Signal<BuildCS<Fr>>)
```

To have your `circuit` proven, you perform the following steps.

1. Generate setup parameters. This is trusted setup, it must be performed by a
   trusted party or in an MPC protocol.

   ```rust
   use fawkes_crypto::backend::bellman_groth16::{
     engines::Bn256,
     setup::setup
   }
   // The Bn256 is one of the engines fawkes-crypto provides. See
   // fawkes_crypto::backend::bellman_groth16 for more options.
   let params = setup::<Bn256, _, _, _>(circuit);
   ```

2. Prove the `circuit`.

   ```rust
   use fawkes_crypto::backend::bellman_groth16::prover;
   let (inputs, proof) = prover::prove(&params, &pub, &sec, circuit);
   ```

3. Verify the `circuit`.

   ```rust
   use fawkes_crypto::backend::bellman_groth16::verifier;
   let res = verifier::verify(&params.get_vk(), &snark_proof, &inputs);
   ```

The API for R1CS constraints is quite similar to Plonk. The main differences
are:

 - Setup is called differently. The available setup parameters and the list of
   engines are different due to R1CS and Plonk working over different backends
   and polynomial commitment schemes (which imposes its own restrictions on the
   fields over which your constraints are applied).

 - The methods of `trait CS` are slightly different. Plonk's `CS` provides
   `enforce_mul` and `enforce_add` while R1CS has only `enforce` for enforcing
   multiplications (equivalent to `enforce_mul`). This is due to R1CS allowing
   linear operations for free, with no constraint overhead, so you can just
   create fresh `CNum`s whenever you need additions. In other words, when you
   do

   ```
   let a: CNum<CS> = CNum<_>::alloc(rcs, …);
   let b: CNum<CS> = CNum<_>::alloc(rcs, …);
   let c: CNum<CS> = a + b;
   ```

   in Plonk, this causes a call to `rcs.borrow_mut().enforce_add(&a, &b,
   &c)` creating an extra constraint in `rcs`. In R1CS, the same code will not
   modify `rcs` in any way — all the information about `c`'s relation to `a`
   and `b` will be stored inside `c` itself.

## Cicuits Library

Fawkes-crypto has a few useful circuits defined for the programmer to import when
building their Constraint Systems.

 - `circuit::bitify` defines circuits for bit-decomposition of `CNum<CS>`
   values into `Vec<CBool<CS>>` as well as circuits for comparing `CNum<CS>`
   values for inequality with $<$ and $>$.

 - `circuit::ecc` defines curcuits for elliptic-curve operations.

 - `circuit::poseidon` and `circuit::eddsaposeidon` implement the Poseidon hash.

 - `circuit::mux3` implements Pedersen hash.
