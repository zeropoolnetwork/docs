# Example programs

We've provided a few runnable example programs that demonstrate the use of
fawkes-crypto in
[fawkes-crypto-examples](https://github.com/zeropoolnetwork/fawkes-crypto-examples/)
repo. All examples are using Plonk constraints, but converting them to R1CS (if
needed) will require only technical changes — modifying Cargo flags, changing
the calls to `setup`, `prove` and `verify` in accordance with Bellman backend.

## Multiplier

This example shows how Prover can convince Verifier that he knows such $a$ and
$b$ that $ab = c$ for some public value $c$. zkSNARK will ensure for us that
Verifier doesn't learn the specific $a$ and $b$ that Prover is using.

This is a bare minimal example to show the use of API, it's not doing
anything useful (although, in principle, a CS like this can be made useful in
conjunction with other constraints implementing more complex conditions).

We start off, by implementing function $F(a, b) = ab$ in a circuit. It's done
like so:

```rust
fn c_multiplier<C: CS>(a: &CNum<C>, b: &CNum<C>) -> CNum<C> {
    a * b
}
```

Note how close the Rust code is to the mathematical description of our function
$F$.

Now we must convert it to `circuit` which will accept $a$, $b$ and $c$ as
inputs and enforce the relation between them:

```rust
pub fn circuit<C: CS>(public: CNum<C>, secret: (CNum<C>, CNum<C>)) {
    let c = c_multiplier(&secret.0, &secret.1);
    c.assert_eq(&public);
}
```

Here, we take one public `CNum` and two private ones and we enforce that public
`CNum` equals the product of the two secret ones. Note how we just declared
`public` as `CNum` and `secret` as a pair of `CNum`s, this is ok because both
types implement `Signal` trait.

We're done with building a circuit and we can prove and verify it via the
standard API calls `setup`, `prove` and `verify` that we've shown in the
[API](./02-api.md) section:

1. Prover starts knowing $(a, b)$, Verifier starts knowing $c$.

2. The trusted party performs `setup` and gives the corresponding keys to
   Prover and Verifier.

   ```rust
   let parameters = Parameters::<Bn256>::setup(10);
   let keys = setup::<_, _, _>(&parameters, circuit::circuit);
   ```

3. Prover builds the proof:

   ```rust
   let (inputs, snark_proof) = prover::prove(
     &parameters,
     &keys.1,
     &Num::from(c),
     &(Num::from(a), Num::from(b)),
     circuit::circuit,
   );
   ```

   and sends the `inputs` and `snark_proof` to Verifier.

4. Verifier looks at `inputs` and makes sure that `c` that's stored there is
   the `c` value it expects (this is not shown in code). Then he verifies the
   proof:

   ```rust
   assert!(verifier::verify(
     &parameters,
     &keys.0,
     &snark_proof,
     &inputs
   ));
   ```

## Fibonacci Numbers

In this example, Prover proves that he knows the value of $n$th Fibonacci
number without leaking it to the Verifier. (The scenario is quite artificial,
but it demonstrates the use of fawkes-crypto well.)

Let $F(n)$ be a function that computes $n$th Fibonacci number. I.e.

$$
\begin{aligned}
F(0) &= 0 \\
F(1) &= 1 \\
F(n) &= F(n - 1) + F(n - 2).
\end{aligned}
$$

First, we express it as a function of `CNum<CS>` in Rust:

```rust
/// Simple circuit that computes the nth fibonacci number.
fn c_fibonacci<C: CS, const N: usize>(n: &CNum<C>) -> CNum<C> {
    let mut a: CNum<C> = n.derive_const(&Num::from(0));
    let mut b: CNum<C> = n.derive_const(&Num::from(1));

    let mut res = a.clone();

    for i in 1..N {
        // Regular Fibonacci iteration.
        let tmp = &a + &b;
        a = b.clone();
        b = tmp;

        // Check if n == i, and update res if so.
        let i_const: CNum<C> = n.derive_const(&Num::from(i as u32));
        let update_res: CBool<C> = n.is_eq(&i_const);
        res = a.switch(&update_res, &res);
    }

    res
}
```

This circuit takes an argument `n: CNum<C>` and returns `n`th Fibonacci
number. The constant `N` specifies the maximum possible value of `n`. The
circuit does `N` Fibonacci iterations and then picks the result of `n`th among
them. Some interesting combinators that we used here are:

 - `n.derive_const(…)` creates a constant in the CS to which `n` belongs. Under
   the hood, it follows the smart reference to CS stored in `n` and calls the
   appropriate methods in it to allocate a new constant.
 - `n.is_eq(…)` checks two `CNum`s for equality, produces a `CBool`.
 - `a.switch(cond, res)` is the if-then-else operation (also known as ternary
   operator in C/C++). If `cond` is 1, it will produce `a` (“then” branch), and
   `res` if `cond` is 0 (“else” branch).

We can't do less than `N` iterations when building the circuit here, since we
don't know what value `n` we will get on input when it gets evaluated. When we
build the circuit, we must describe the fixed structure of computations that
will work for all inputs that we handle. (Self-check question: what will this
circuit produce when `n > N`?)

Then we convert the circuit to predicate $C(\texttt{pub}, \texttt{sec})$ which
checks that $F(\texttt{pub}) = \texttt{sec}$.

```rust
pub fn circuit<C: CS, const N: usize>(public: CNum<C>, secret: CNum<C>) {
    let num = c_fibonacci::<C, { N }>(&public);
    num.assert_eq(&secret);
}
```

Once we have the CS ready, we do the standard setup-prove-verify steps:

1. A trusted party performs setup.

   ```rust
   let parameters = Parameters::<Bn256>::setup(10);
   let keys = setup::<_, _, _>(&parameters, circuit::circuit::<_, { N }>);
   ```

2. Prover computes the actual Fibonacci number:

   ```rust
   let n = 4;
   let num = fibonacci_number(n);
   ```

   And proves to Verifier that it's correct:

   ```rust
   let (inputs, snark_proof) = prover::prove(
     &parameters,
     &keys.1,
     &Num::from(n as u64),
     &Num::from(num),
     circuit::circuit::<_, { N }>,
   );
   ```

   Value `n` here is public, and `num` is secret. The `snark_proof` does not
   reveal `num`.

3. Finally, Verifier checks that the proof is correct:

   ```rust
   assert!(verifier::verify(
     &parameters,
     &keys.0,
     &snark_proof,
     &inputs
   ));
   ```

   This convinces Verifier that Prover knows `n`th Fibonacci number without
   revealing the number itself to the Verifier or having Verifier recompute
   that number directly.

## Poseidon Hash

In this example, Prover proves that he knows the hash preimage of some
public value. The hash function we use is zkSNARK-friendly [Poseidon
hash](https://www.poseidon-hash.info/).

Let $F(x) = y$ be the Poseidon hash function. We want to prove the relation
$F(x) = y$ for a public $y$ and secret (known only to Prover) $x$. We start
by building a predicate $C(y, x)$ which states that. Here, we don't need
to implement the Poseidon hash by hand since fawkes-crypto provides an
implementation we can import:

```rust
use fawkes_crypto::{
    circuit::poseidon::c_poseidon,
    native::poseidon::PoseidonParams,
};

// Initialize Poseidon hash parameters. See Poseidon docs for more info on
// these
pub static POSEIDON_PARAMS: Lazy<PoseidonParams<Fr>> =
    Lazy::new(|| PoseidonParams::<Fr>::new(6, 8, 53));

pub fn circuit<C: CS<Fr = Fr>>(public: CNum<C>, secret: CNum<C>) {
    let h = c_poseidon(&[secret], &*POSEIDON_PARAMS);
    h.assert_eq(&public);
}
```

This follows the same structure as the Multiplier example above: we compute
a function and the connect its output with the appropriate public or secret
inputs using `assert_eq`.

Then we follow the standard structure:

1. Prover starts knowing secret `data`, Verifier starts knowing `hash =
   poseidon(data)`.

2. Trusted party does setup.

3. Prover builds the proof:

   ```rust
   let (inputs, snark_proof) = prover::prove(
     &parameters,
     &keys.1,
     &hash,
     &data,
     circuit::circuit,
   );
   ```

   And sends `inputs` and `snark_proof` to the Verifier.

4. Verifier ensures that `inputs` contains the correct `hash` value (not shown
   in code). And then verifies the proof.

   ```rust
   assert!(verifier::verify(
     &parameters,
     &keys.0,
     &snark_proof,
     &inputs
   ));
   ```

## Magic Square (Web)

This example shows how Prover can convince the Verifier that
he knows a $3 \times 3$matrix of values that form a [Magic
square](https://en.wikipedia.org/wiki/Magic_square). This example is distinct
from the ones we've presented above because it compiles into WebAssembly and
runs in the browser.

A square matrix of numbers is called a magic square if the sum of values of
every row, every column and each of the two diagonals is the same.  Magic
square is a generalization of Sudoku solving problem, you could tailor this
example to have Prover convince Verifier that he knows a solution to Sudoku
without disclosing it.

$$
  \begin{array}{ccccccl}
    & & \boxed{a_{1,1}} & \boxed{a_{1,2}} & \boxed{a_{1, 3}} & \to & s \\
    & & \boxed{a_{2,1}} & \boxed{a_{2,2}} & \boxed{a_{2, 3}} & \to & s \\
    & & \boxed{a_{3,1}} & \boxed{a_{3,2}} & \boxed{a_{3, 3}} & \to & s \\
    & \swarrow & \downarrow & \downarrow & \downarrow & \searrow & \\
    s & & s & s & s & & s \\
  \end{array}
$$

We build a Constraint System $C(s, \{a_{1,1}, a_{1,2} \dots a_{3,3}\})$ which
checks this condition, $s$ being public and $a_{\dots}$ being private. It's
a straightforward list of conditions:

```rust
pub fn circuit<C: CS>(public: CNum<C>, secret: SizedVec<CNum<C>, 9>) {
  (&secret[0] + &secret[1] + &secret[2]).assert_eq(&public);
  (&secret[3] + &secret[4] + &secret[5]).assert_eq(&public);
  (&secret[6] + &secret[7] + &secret[8]).assert_eq(&public);

  (&secret[0] + &secret[3] + &secret[6]).assert_eq(&public);
  (&secret[1] + &secret[4] + &secret[7]).assert_eq(&public);
  (&secret[2] + &secret[5] + &secret[8]).assert_eq(&public);

  (&secret[0] + &secret[4] + &secret[8]).assert_eq(&public);
  (&secret[2] + &secret[4] + &secret[6]).assert_eq(&public);
}
```

The setup → prove → verify process in this example is identical to the ones
we've presented above. The only difference is build configuration and the
command used for running the example. See `Cargo.toml` and `start.sh` for more
details.
