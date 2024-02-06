# Verifier

This is Rust code that provides functions for verifying Groth16 zero knowledge proofs using the Alt-BN128 curve. The code defines two types, `VK` and `Proof`, that represent the verification key and proof, respectively. VK contains several parameters that are used in the verification process, including `alpha`, `beta`, `gamma`, `delta`, and `ic`. Proof contains three elements, `a`, `b`, and `c`.

The code also defines several helper functions for working with points on the curve, including `alt_bn128_g1_multiexp`, `alt_bn128_g1_sum`, `alt_bn128_g1_neg`, and `alt_bn128_pairing_check`. These functions are used in the main verification function, `alt_bn128_groth16verify`, which verifies a Groth16 proof using the provided verification key and input.

The `alt_bn128_groth16verify` function first checks that the length of the input is consistent with the length of the ic parameter in the verification key. It then calculates the accumulated value of the input using `alt_bn128_g1_multiexp` and verifies the proof by checking the result of a pairing operation using `alt_bn128_pairing_check`.

## Source code

* [verifier.rs](https://github.com/zeropoolnetwork/zeropool-substrate/blob/main/pallets/pallet-zeropool/src/verifier.rs)