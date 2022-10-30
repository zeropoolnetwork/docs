---
description: To prove an input account ownership
---

# Signing a Transaction

Transactions in ZeroPool are signed by the spending key $$\sigma$$. To verify a transaction signature the prover should use an intermediate key A.

### Transaction hashing

A client application should sign a 'composite' transaction hash instead of full transaction data. The transaction hash is calculated from the input and output hashes:

$$H = Hash_{sponge}(Hash_{account}(Acc^\text{in}), Hash_{note}(Note_0^\text{in}), Hash_{note}(Note_1^\text{in}), Hash_{note}(Note_2^\text{in}), TxCommit)$$

where

* $$Hash$$ is a [Poseidon multi-hash (sponged) routine](../untitled/the-poseidon-hash.md) in the different modes
* $$Acc^\text{in}$$is an input account
* $$Note_i^\text{in}$$is an input notes,
* $$TxCommit$$ - is a transaction commitment hash (Merkle subtree root). It depends on transaction output account and notes.

### Signing

Next, a client uses the account spending key to sign a transaction hash $$H$$:

$$r = Blake2s(\sigma, H)$$, where[$$Blake2s$$ is the 256-bit hash function ](https://www.blake2.net/blake2x.pdf)

$$R = rG$$, $$A=\sigma G$$ (moving $$r$$ and $$\sigma$$ to the JubJub Elliptic curve field)

$$S = r + Hash_{eddsa}(R.x, A.x, H)\sigma$$

The output signature $$(S, R)$$ will be sent with a intermediate key $$A = \sigma G$$

### Verifying

To verify a transaction signature a validator should perform the following computations:

$$SG == R + Hash_{eddsa}(R.x, A.x, H)A$$

