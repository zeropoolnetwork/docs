---
description: The common entities
---

# Accounts and Notes

A set of accounts and notes implement the base functionality of private transactions. The Merkle tree is built from them. They are arranged in a strictly ordered sequence and represent tree leafs. A new account state is added to this sequence to update the account balance.

* [Accounts](accounts.md) contain information about a user's wallet which can only be decrypted by the owner.
* [Notes](notes.md) specify a user's available assets. They are also encrypted and can only be accessed by the sender or receiver.​
