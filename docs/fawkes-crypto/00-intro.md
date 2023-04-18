# Introduction

[Fawkes Crypto](https://github.com/zeropoolnetwork/fawkes-crypto) library
provides a lightweight Rust EDSL (Embedded Domain Specific Language) for
describing ZK constraints, as well as proving and verifying them using
different backends. The backends we currently support are Bellman Groth16 (R1CS
constraints) and Halo2 (Plonk constraints).

In the following sections we go through the overview of common zkSNARK
terminology, then introduce fawkes-crypto library and demonstrate its use on a
few example programs.
