---
title: Fast Fourier Inspired Folding for Sangria
date: 2023-04-03
---

This is a crosspost with [zkresear.ch/t/fast-fourier-inspired-sangria](https://zkresear.ch/t/fast-fourier-inspired-sangria).

## Introduction

[Sangria](https://geometry.xyz/notebook/sangria-a-folding-scheme-for-plonk) is the folding protocol for Plonk prover. In the original model, the prover works iteratively and merges a new execution trace with an execution trace accumulator. 

Here we will show, how to build an optimized folding process, requiring only 2 or 1 scalar multiplications per folding on the verifier side.

## Original Protocol

Accumulated instance and witness:

$U'_n := (\mathbf{X}'_n, u'_n, \overline{W}'_n, \overline{E}'_n),$
$W'_n := (\mathbf{W}'_n, \mathbf{e}'_n, r'_{Wn}, r'_{En})$

Iteration instance and witness:

$U_n := (\mathbf{X}_n, u_n, \overline{W}_n, \overline{E}_n),$
$W_n := (\mathbf{W}_n, \mathbf{e}, r_{Wn}, r_{En})$

Where $\overline{W}=\text{Com}(\text{pp}_W, \mathbf{W}, r_W),\ \overline{E} = \text{Com}(\text{pp}_W, \mathbf{e}, r_E)$.

We use a relaxed Plonk gate equation:
$C(\mathbf{a}, {\mathbf{b}}, {\mathbf{c}}, u, {\mathbf{e}})={\mathbf{a}} {\mathbf{b}} {\mathbf{q_M}} + {\mathbf{q_C}} {u}^{2} + {\left({\mathbf{a}} {\mathbf{q_L}} + {\mathbf{c}} {\mathbf{q_O}} + {\mathbf{b}} {\mathbf{q_R}}\right)} {u} + {\mathbf{e}}$

1. Prover send to Verifier $\overline{T}_n = \text{Com}(\text{pp}_W, \mathbf{t}_n, r_{Tn})$,
## Introduction

[Sangria](https://geometry.xyz/notebook/sangria-a-folding-scheme-for-plonk) is the folding protocol for Plonk prover. In the original model, the prover works iteratively and merges a new execution trace with an execution trace accumulator. 

Here we will show, how to build an optimized folding process, requiring only 2 or 1 scalar multiplications per folding on the verifier side.

## Original Protocol

Accumulated instance and witness:

$U'_n := (\mathbf{X}'_n, u'_n, \overline{W}'_n, \overline{E}'_n),$
$W'_n := (\mathbf{W}'_n, \mathbf{e}'_n, r'_{Wn}, r'_{En})$

Iteration instance and witness:

$U_n := (\mathbf{X}_n, u_n, \overline{W}_n, \overline{E}_n),$
$W_n := (\mathbf{W}_n, \mathbf{e}, r_{Wn}, r_{En})$

Where $\overline{W}=\text{Com}(\text{pp}_W, \mathbf{W}, r_W),\ \overline{E} = \text{Com}(\text{pp}_W, \mathbf{e}, r_E)$.

We use a relaxed Plonk gate equation:
$C(\mathbf{a}, {\mathbf{b}}, {\mathbf{c}}, u, {\mathbf{e}})={\mathbf{a}} {\mathbf{b}} {\mathbf{q_M}} + {\mathbf{q_C}} {u}^{2} + {\left({\mathbf{a}} {\mathbf{q_L}} + {\mathbf{c}} {\mathbf{q_O}} + {\mathbf{b}} {\mathbf{q_R}}\right)} {u} + {\mathbf{e}}$

1. Prover send to Verifier $\overline{T}_n = \text{Com}(\text{pp}_W, \mathbf{t}_n, r_{Tn})$,
where $t_n=2 \, {\mathbf{q_C}} {u'_n} {u_n} + {\left({\mathbf{a}_n} {\mathbf{b}'_n} + {\mathbf{a}'_n} {\mathbf{b}_n}\right)} {\mathbf{q_M}} + {\left({\mathbf{a}_n} {\mathbf{q_L}} + {\mathbf{c}_n} {\mathbf{q_O}} + {\mathbf{b}_n} {\mathbf{q_R}}\right)} {u'_n} + {\left({\mathbf{a}'_n} {\mathbf{q_L}} + {\mathbf{c}'_n} {\mathbf{q_O}} + {\mathbf{b}'_n} {\mathbf{q_R}}\right)} {u_n}$
where $t_n=2 \, {\mathbf{q_C}} {u'_n} {u_n} + {\left({\mathbf{a}_n} {\mathbf{b}'_n} + {\mathbf{a}'_n} {\mathbf{b}_n}\right)} {\mathbf{q_M}} + {\left({\mathbf{a}_n} {\mathbf{q_L}} + {\mathbf{c}_n} {\mathbf{q_O}} + {\mathbf{b}_n} {\mathbf{q_R}}\right)} {u'_n} +\\ {\left({\mathbf{a}'_n} {\mathbf{q_L}} + {\mathbf{c}'_n} {\mathbf{q_O}} + {\mathbf{b}'_n} {\mathbf{q_R}}\right)} {u_n}$
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

## Fast-Fourier Inspired Approach

We see, that most operations on the verifier side are linear. So, we can use the approach from [GW21](https://eprint.iacr.org/2021/1167.pdf).

Let's define the following functions:

$f_L(X) = a(X^4) + X b(X^4) + X^2 c(X^4) + X^3 e(X^4),$
$f_R(X) = a(X^4) + X b(X^4) + X^2 c(X^4) - X^3 t(X^4),$
$\epsilon_R(X) = X^3 e(X^4)$

where $a, b, c, e, t$ are polynomials corresponding to vectors $\mathbf{a}, \mathbf{b}, \mathbf{c}, \mathbf{e}, \mathbf{t}$. It is important, that the field has a multiplicative subgroup of order $4$. If we need more columns, we can use the same approach with bigger subgroups.

Then we can rewrite the witness part of the folding procedure as follows:

1. Prover computes $\mathbf{t}$ and sends to verifier $[f_{R\ n}]$, $[\epsilon_{R\ n}]$
2. Verifier sends to prover random $r$
3. Prover and Verifier output the folded instance

$[f'_{L\ n+1}] = [f'_{L\ n}] + r [f_{R\ n}] + r^2 [\epsilon_{R\ n}]$

4. Prover output the folded witness

$f'_{L\ n+1} = f'_{L\ n} + r f_{R\ n} + r^2 \epsilon_{R\ n},$


For final check we should make openings of $f_L$ at points $x, x \sqrt{-1}, -x, -x \sqrt{-1}$, where $x$ is random, and recover $a(x^4), b(x^4), c(x^4), e(x^4)$.

It is important to note that the folding process complexity is still linear. We don't need an explicit representation of f(x) in the prover-side folding process:

$[f_L(x)] = [\sum_{i=0}^{n-1} (a_i + b_i x \lambda_i(x^4) + c_i x^2 \lambda_i(x^4) + e_i x^3 \lambda_i(x^4))] =\\
 \sum_{i=0}^{n-1} ([a_i] + b_i [x \lambda_i(x^4)] + c_i [x^2 \lambda_i(x^4)] + e_i [x^3 \lambda_i(x^4)]).$


The proposed method provides only 2 scalar multiplications per folding instead of 5 or more. And it requires 4 times bigger CRS.

UPD:
In the case of IVC, when the 2nd instance is original Plonk, $\epsilon_R(X)=0$ and we need only one scalar multiplication per folding.

