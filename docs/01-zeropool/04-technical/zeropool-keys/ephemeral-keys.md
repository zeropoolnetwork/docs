---
description: Receiving key, outgoing viewing key
---

# Ephemeral keys

Ephemeral keys are used to encrypt transaction data (accounts and notes). The symmetric cipher algorithm ([ChaCha20Poly1305](https://datatracker.ietf.org/doc/html/rfc8439)) which applies to the memo block is required to use different keys for security reasons.

There are two cases where ephemeral keys are generated: [notes encryption](../transaction-overview/untitled-1/memo-block-encryption.md#notes-encryption) and [shared secrets encryption](../transaction-overview/untitled-1/memo-block-encryption.md#shared-secrets-encryption). In both cases ephemeral keys are derived from the random secret keys generated before the each encryption operation. The account's intermediate key is used for the derivation process.

* The **receiving key** is a set of the intermediate key $$\eta$$ and ephemeral public key $$Ai$$. These are used to derive the note encryption key. Successfully decrypted notes with the $$\eta$$ key are considered received keys by a client.
* The **outgoing viewing key** is used to decrypt shared secrets in the memo block. Shared secrets contain symmetric keys which are used to decrypt the output account and notes for the current transaction.

