---
title: Running Sangria final proof in shielded mode on untrusted 3rd party prover
date: 2023-04-04
---
This is a crosspost with [zkresear.ch/t/running-sangria-final-proof-in-shielded-mode-on-untrusted-3rd-party-prover](https://zkresear.ch/t/running-sangria-final-proof-in-shielded-mode-on-untrusted-3rd-party-prover).

## Introduction

[Sangria](https://geometry.xyz/notebook/sangria-a-folding-scheme-for-plonk) is a folding protocol for the Plonk prover. In the original model, the prover works iteratively and merges a new execution trace with an execution trace accumulator.

Here we will show, how to build a special high entropy execution trace. After merging with the accumulator, the resulting execution trace could be shown by an untrusted prover with zero data leaks.

This approach allows us to perform linear complexity execution on a thin client and do hard computations on the server without data leaks.

## Original protocol

Accumulated instance and witness:

$U'_n := (\mathbf{X}'_n, u'_n, \overline{W}'_n, \overline{E}'_n),$

$W'_n := (\mathbf{W}'_n, \mathbf{e}'_n, r'_{Wn}, r'_{En})$

Iteration instance and witness:

$U_n := (\mathbf{X}_n, u_n, \overline{W}_n, \overline{E}_n),$

$W_n := (\mathbf{W}_n, \mathbf{e}, r_{Wn}, r_{En})$

Where $\overline{W}=\text{Com}(\text{pp}_W, \mathbf{W}, r_W),\ \overline{E} = \text{Com}(\text{pp}_W, \mathbf{e}, r_E)$.

We use the relaxed Plonk gate equation:

$C(\mathbf{a}, {\mathbf{b}}, {\mathbf{c}}, u, {\mathbf{e}})={\mathbf{a}} {\mathbf{b}} {\mathbf{q_M}} + {\mathbf{q_C}} {u}^{2} + {\left({\mathbf{a}} {\mathbf{q_L}} + {\mathbf{c}} {\mathbf{q_O}} + {\mathbf{b}} {\mathbf{q_R}}\right)} {u} + {\mathbf{e}}$

1. Prover send to Verifier $\overline{T}_n = \text{Com}(\text{pp}_W, \mathbf{t}_n, r_{Tn})$,

where $t_n=2 \, {\mathbf{q_C}} {u'_n} {u_n} + {\left({\mathbf{a}_n} {\mathbf{b}'_n} + {\mathbf{a}'_n} {\mathbf{b}_n}\right)} {\mathbf{q_M}} + {\left({\mathbf{a}_n} {\mathbf{q_L}} + {\mathbf{c}_n} {\mathbf{q_O}} + {\mathbf{b}_n} {\mathbf{q_R}}\right)} {u'_n} + {\left({\mathbf{a}'_n} {\mathbf{q_L}} + {\mathbf{c}'_n} {\mathbf{q_O}} + {\mathbf{b}'_n} {\mathbf{q_R}}\right)} {u_n}$

2. Verifier sends to prover random $r$

3. Prover and Verifier output the folded instance

$U'_{n+1}=(\mathbf{X}'_{n+1}, u'_{n+1}, \overline{W}'_{n+1}, \overline{E}'_{n+1}),$

where

$\mathbf{X}'_{n+1} = \mathbf{X}'_n + r \mathbf{X}_n,$

$u'_{n+1} = u'_n + r u_n,$

$\overline{W}'_{n+1} = \overline{W}'_n + r \overline{W}_n,$

$\overline{E}'_{n+1} = \overline{E}'_n + r^2 \overline{E}_n - r \overline{T}_n.$

4. Prover output the folded witness

$W'_{n+1} = (\mathbf{W}'_{n+1}, \mathbf{e}'_{n+1}, r'_{W\ n+1}, r'_{E\ n+1}),$

where

$\mathbf{W}'_{n+1} = \mathbf{W}'_n + r \mathbf{W}_n,$

$\mathbf{e}'_{n+1} = \mathbf{e}'_n + r^2 \mathbf{e}_n - r \mathbf{t}_n,$

$r'_{W\ n+1} = r'_{W\ n} + r r_{Wn},$

$r'_{E\ n+1} = r'_{E\ n} + r^2 r_{En} - r r_{Tn}.$

We can check, that $C(\mathbf{a}'_{n+1}, \mathbf{b}'_{n+1}, \mathbf{c}'_{n+1}, u'_{n+1}, \mathbf{e}'_{n+1}) = C(\mathbf{a}'_n, \mathbf{b}'_n, \mathbf{c}'_n, u'_n, \mathbf{e}'_n) + r^2 C(\mathbf{a}_n, \mathbf{b}_n, \mathbf{c}_n, u_n, \mathbf{e}_n)$.

## Sangria zero-knowledge protocol for untrusted 3rd party prover

Instead of proving the execution trace after the last step, we can merge it with a random execution trace and send the result to 3rd party prover. Zero-knowledge property means, that 3rd party prover can't learn anything about the initial execution trace.

Let's replace the final proving protocol with an additional round, where the client mixes the state with a special generated random trace and send the result to the untrusted 3rd party prover.

We will prove, that the prover can not learn anything about the initial execution trace.

Let's consider $(U'_{n+1}, W'_{n+1})$ as the final state of the protocol, $(U'_n, W'_n)$ as the initial state of the protocol $(U_n, W_n)$ as the random state.

For any possible initial state $(U', W')$ we try to roll back the protocol on the 3rd party prover side and find the corresponding merged state $(U, W)$.

$\mathbf{W} = \frac{\mathbf{W}'_{n+1} - \mathbf{W}'}{r},$

$r_W = \frac{r'_{W\ n+1} - r'_{W}}{r},$

$\mathbf{t} = \mathbf{t}(W, W')$

$\mathbf{e} = \frac{\mathbf{e}'_{n+1} - \mathbf{e}' + r \mathbf{t}}{r^2}$

$r_E = \frac{r'_{E\ n+1} - r'_{E} + r r_{Tn}}{r^2}$

$u = \frac{u'_{n+1} - u'}{r}$

Assuming, that

$C(\mathbf{a}'_{n+1}, \mathbf{b}'_{n+1}, \mathbf{c}'_{n+1}, u'_{n+1}, \mathbf{e}'_{n+1}) = 0,$

$C(\mathbf{a}', \mathbf{b}', \mathbf{c}', u', \mathbf{e}') = 0,$

and substituting the variables, we get

$C(\mathbf{a}, \mathbf{b}, \mathbf{c}, u, \mathbf{e}) = 0.$

That means that for the given to 3rd party prover execution trace and any possible initial execution trace, there is an existing execution trace, that can be merged with the given trace and the result will be the given trace.

Considering $a_n, b_n, c_n$ as independent random variables, we get, that all initial information is hidden.

UPD: all intermediate computations are available on sage math here: [snjax/sangria-delegated-zk](https://github.com/snjax/sangria-delegated-zk)