---
description: Relayer lifecycle detailed description
---

# Relayer Operations

The relayer is a mediator between clients and the ZeroPool contracts subsystem. Following are typical use cases when interacting with the relayer.&#x20;

### Fetching state

The user must keep and synchronize the current pool state to build proper transaction proofs. The pool state is held in the client as an ordered set of encrypted transactions ([memo blocks](../transaction-overview/untitled-1/)) and the user should decrypt each of these to obtain account and note information.  To receive this info, the client uses the `eth_getLogs` RPC endpoint method, and during periods of heavy volume RPC endpoints can become overloaded.&#x20;

The relayer keeps the actual pool transaction set, synchronizes it continuously, and returns a desired set of transactions to the users. It significantly decreases overhead for mainnet nodes.

### Sending transactions

When sending a transaction, a user must create the tx body (memo block), calculate the corresponding tx proof, and send it to the relayer. In this case there is no need to worry about the Merkle tree root, only the actual state (balance and notes) is needed as all tree-related work is performed by the relayer.

