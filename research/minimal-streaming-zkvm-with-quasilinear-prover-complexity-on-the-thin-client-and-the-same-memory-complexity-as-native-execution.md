---
title: Minimal streaming zkVM with quasilinear prover complexity on the thin client and the same memory complexity, as native execution
date: 2023-09-23
---

This is a crosspost with [zkresear.ch/t/minimal-streaming-zkvm-with-quasilinear-prover-complexity-on-the-thin-client-and-the-same-memory-complexity-as-native-execution](https://zkresear.ch/t/minimal-streaming-zkvm-with-quasilinear-prover-complexity-on-the-thin-client-and-the-same-memory-complexity-as-native-execution).

## Introduction

Here we present a sketch draft of minimal zkVM architecture using 2023 year industry improvements. The main issue of zkVM is the cost of proving. If you need privacy, you cannot delegate the whole proving to the 3rd party, so you need to do all proof or part of it by yourself, ideally on your mobile device or browser. This environment is very limited in resources, so the main goal of zkVM is to reduce the cost of proving as much as possible.


The most costly parts of zkVM are lookups and permutations. Here we will show how to use an approach similar to [EFG2023](https://eprint.iacr.org/2022/1763.pdf) for building zkVM with FRI polynomial commitments, log-derivative permutation arguments, quasi-linear performance complexity on the thin client and the same memory complexity, as native execution.


## Preliminaries

Let's represent simple registry-based VM with a set of registers $\mathbf{PC}, \mathbf{R}_0, \ldots, \mathbf{R}_{L-1}$ and memory addressed from $0$ to $M-1$, where $\mathbf{PC}$ is program counter, using for control flow, and $\mathbf{R}_i$ are general purpose registers. 

The source code is a set 

$\mathbb{Code} = \left\{(\mathbf{PC}, \mathbf{Instruction})\right\},$ where $\mathbf{PC}$ is unique and contains values from $0$ to $N-1$.

The execution trace is a set 

$\mathbb{ETrace} = \left\{(\mathbf{CLK}, \mathbf{PC}, \mathbf{Instruction}, \mathbf{R}_0, \ldots, \mathbf{R}_{L-1})\right\}$, where $\mathbf{CLK}$ is unique and contains values from $0$ to $T-1$.

The memory trace is a multiset (like a set, but with possible multiple same elements)

$\mathbb{MTrace} = \left\{(\mathbf{CLK}, \mathbf{Address}, \mathbf{Value})\right\} \cup \left\{\mathbf{NULL}\right\}$, where $\mathbf{Address}$ is a memory address and $\mathbf{Value}$ is a value, stored at this address. $(\mathbf{CLK}, \mathbf{Address}, \mathbf{Value})$ is not unique, because the same address could be read multiple times by the same opcode execution. If the opcode writes to memory, the $\mathbf{CLK}$ for the value should correspond to the next opcode execution, reading the address or end of the program. $\mathbf{NULL}$ is a special element, used if the opcode is optionally not interacting with memory. Also, let's consider $\mathbf{CLK}=\mathbf{End}$ at the end of the program.


We need to prove, that VM with given $\mathbf{InitialState}$ and $\mathbf{InitialMemory}$ will produce $\mathbf{FinalState}$ and $\mathbf{FinalMemory}$ after execution of $\mathbf{Code}$.

Let's consider $\mathbf{InitialState}$ and $\mathbf{FinalState}$ as elements of $\mathbb{ETrace}$, and $\mathbb{InitialMemory}$ and $\mathbb{FinalMemory}$ as subset (not a submultiset, $\mathbf{Address}$ should be unique) of $\mathbb{MTrace}$ with fixed $\mathbf{CLK}$ ($0$ for $\mathbb{InitialMemory}$ and $\mathbf{End}$ for $\mathbb{FinalMemory}$).


## Proving

## Correctness of instruction set

For each $\mathbb{ETrace}$ element we should prove that it exists in $\mathbb{Code}$. As part of the zkSNARK protocol, it could be done as a lookup, where $\mathbb{Code}$ is a lookup table.

## Correctness of initial and final states

We should prove, that all addresses, used in $\mathbb{InitialMemory}$ are unique. Also, we should prove, that $\mathbf{Instruction}$ in $\mathbf{FinalState}$ is $\mathbf{HALT}$.

## Correctness of execution

For simplification, we will represent proving all opcodes in the same circuit. Next, we will see, that it is not necessary, but it is easier to understand.

Let's consider the opcode can touch up to $P$ memory addresses. Then we can prove the following state transitions for each $\mathbb{ETrace}$ element excluding the last one (because there is no next element for it).

$\mathbf{InputState}_{\mathbf{CLK}=i},\ \mathbf{InputMemCell}_{0, \mathbf{CLK} \leq i}, \ldots \mathbf{InputMemCell}_{P-1, \mathbf{CLK}\leq i}\\ \xrightarrow{\mathbf{Instruction}_{CLK=i}} \mathbf{OutputState}_{\mathbf{CLK}=i+1\ \text{or}\ \mathbf{End}},\\ \mathbf{InputMemCell}_{0, \mathbf{CLK} = i\ \text{or}\ \mathbf{End}}, \ldots \mathbf{InputMemCell}_{P-1, \mathbf{CLK}=i\ \text{or}\ \mathbf{End}}$ 

$\mathbf{InputState}$ and $\mathbf{OutputState}$ are elements of $\mathbb{ETrace}$, $\mathbf{InputMemCell}$ and $\mathbf{OutputMemCell}$ are elements of $\mathbb{MTrace}$.

To prove the correctness of execution we need to prove the following statements:

$\left\{\mathbf{InputState}\right\} \cup \left\{\mathbf{FinalState}\right\} = \left\{\mathbf{OutputState}\right\} \cup \left\{\mathbf{InitialState}\right\}$

$\bigcup_i \ \left\{\mathbf{InputMemCell_i}\right\} \cup \mathbb{FinalMemory} = \bigcup_i \ \left\{\mathbf{OutputMemCell_i}\right\} \cup \mathbb{InitialMemory}$ 

## Splitting the circuit

The equations over sets to verify VM execution are additive. So, we can split the circuit into smaller parts, proving each part separately. The part for initial and final states remains the same, just in set and multiset equations we should add more chunked elements instead of single ones.

$\bigcup_{\text{chunks}} \left\{\mathbf{InputState}\right\} \cup \left\{\mathbf{FinalState}\right\} = \bigcup_{\text{chunks}} \left\{\mathbf{OutputState}\right\} \cup \left\{\mathbf{InitialState}\right\}$

$\bigcup_{\text{chunks}} \bigcup_i \ \left\{\mathbf{InputMemCell_i}\right\} \cup \mathbb{FinalMemory} =\\ \bigcup_{\text{chunks}} \bigcup_i \ \left\{\mathbf{OutputMemCell_i}\right\} \cup \mathbb{InitialMemory}$ 

Log-derivative permutation arguments allow us to easily prove equality of multisets $\mathbb{A}$ and $\mathbb{B}$ by proving equality of rational polynomial expression $\sum 1/(a_i - x) = \sum 1/(b_i - x)$ at random point $x$. We see this expression is additive also, so we can easily rewrite our multiset equations to polynomial equations.


We can split the execution circuit for the following purposes:

1. Proving each opcode separately allows us to reduce the complexity of the circuit
2. Splitting execution trace into small chunks allows us to reduce prover complexity because FRI complexity is $O(n \log n)$, where $n$ is the size of the circuit.

Important to note, that chunks should not be segments of execution trace, they could be sparse. Only the sum of chunks should cover the whole execution trace. This fact led us to a streaming proving strategy.

## Streaming proving strategy

We will run the VM two times. 

The first time, we produce an execution trace, we will split it into separate pools for each circuit. When the pool is full, we compute the hash of the evaluation domain of polynomials for this pool (without running full FRI protocol) and forget all data for this pool except the hashes. After executing the whole program we have a set of hashes, which we will use to compute the challenge for multiset expression.

The second time we produce the execution trace the same way, but make FRI proofs for each chunk of the execution trace.

Usage of the same challenge allows us to aggregate multiset expressions into a single equation and verify that the chunks cover the whole execution and memory trace.

As a result, we have multiple small proofs, which can be aggregated into a single proof on the local machine or cloud prover.

## Conclusion

This approach allows us to reduce the resource cap of the prover, delegate part of proving to untrusted cloud prover, and provide us to run zkVM on mobile devices and browsers.