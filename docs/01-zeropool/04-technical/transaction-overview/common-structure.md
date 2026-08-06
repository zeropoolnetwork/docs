---
description: Public and secret fields
---

# Common Structure

The transaction sent to the ZeroPool contract contains the following fields:

* Account nullifier - protects from double-spending, if the nullifier already exists the transaction is not valid and will not be executed.
* Transaction commitment - transaction's subtree root hash
* Transfer index
* XP (energy) amount - for withdrawal transaction
* Token amount - a positive value for deposit transaction, negative for withdrawal.
* Transaction proof
* Merkle tree root after transaction inclusion
* Merkle tree proof
* [Transaction type](transaction-types.md)
* Transaction specific fields (depending on transaction type)
* Memo block containing encrypted transaction details (accounts and notes)
* Deposit signature - for retrieving source account (exists in the deposit transaction only)

In general, a transaction sender must prepare all fields before submitting a tx to the contract. When using the relayer, the relayer should calculate proofs and send the transaction to the contract.

There are two parts to a transaction created by a sender -  public and secret.&#x20;

1. The public input containing encrypted transaction data and other fields which do not disclosure sender, receiver, internal transfer amount, etc.
2. The secret portion contains unencrypted data such as input and output accounts and notes, proofs, and EDDSA signature.

#### Public transaction components

* The current Merkle tree root (before transaction processing by the contract)
* Input account nullifier
* Transaction commitment
* Delta value (a composition of the transaction index, token delta and energy delta)
* Memo block

#### Secret transaction components

* A set of unencrypted input\output account and notes for the transaction
* Input account and notes proofs
* Transaction signature $$(S, R)$$
* Transaction verifier key $$A$$ to verify signature



