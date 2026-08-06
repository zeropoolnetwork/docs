---
description: Double-spending protection
---

# Nullifiers

The nullifier is a unique value calculated on the transaction input account. It is included in the public transaction portion. The nullifier depends on the input account and the intermediate key $$\eta$$:

$$Nullifier(Acc^\text{in}) = Hash_{nullifier}(Hash_{account}(Acc^\text{in}), \eta)$$

where $$Hash_{nullifier}$$ and $$Hash_{account}$$ is a[ $$Poseidon$$ hash functions](../untitled/the-poseidon-hash.md)

There is an archive on the contract side which holds nullifiers. In the case of account double-spending the nullifiers for the same accounts will equal one another. In this case the contract will reject a second transaction with the repeated nullifier value.
