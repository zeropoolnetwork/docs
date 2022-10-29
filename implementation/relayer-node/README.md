---
description: An intermediary between ZeroPool clients and contract
---

# Relayer Node

The relayer is a client interface to the ZeroPool solution. The main purpose of the relayer is to process an input transaction, calculate Merkle tree proofs, and send them to the contract.

The relayer node is not a mandatory component of the system - users can create transactions and interact with the Pool contract directly. However, possible issues can arise with direct interaction:&#x20;

1. If the Merkle tree on the client side is not continuously synced it is not possible to create the correct proof required for the transaction.&#x20;
2. When the Pool is congested (many users sending simultaneous transactions), the time delay between proof calculation and transaction delivery to the pool may lead to collisions. If a transaction is sent during this time interval the Merkle tree root will change and the transaction will be reverted (while still consuming gas).

The relayer solves these issues by enforcing strict transaction ordering. Moreover it takes on the heavy tree proof computations and pool state synchronisation. You can simply query the current pool state instead of extracting it from the pool's calldata. In general the relayer helps to facilitate contract interaction.

{% hint style="info" %}
The relayer cannot compromise transactions or conduct "Man in the Middle" type attacks.  Due to the underlying zero-knowledge infrastructure of the protocol, it cannot steal money, reveal shielded balances, decrypt transactions receiver\amount or change transactions. The worst it can do is provide an incorrect state to the user.
{% endhint %}

{% hint style="success" %}
An advantage of using a relayer is increased anonymity due to abstracted gas payments. When you directly interact with the ZeroPool contract your actions can be disclosed implicitly because you pay gas fees on the native blockchain.
{% endhint %}

* The relayer consists of a Merkle tree instance and transaction storage.
* The Merkle tree is based on a key-value database. It supports adding new leaves, root updating, and zkSNARK proofs building.
* Transaction storage is used to to save encrypted accounts and notes. The relayer can provide a fast reply to the client during the state synchronization.
* Clients interact with the relayer via the [REST API](rest-api.md).
* [Relayer github repo](https://github.com/zeropoolnetwork/zeropool-relayer).

{% hint style="warning" %}
#### Relayer scalability

ZeroPool is developed to support a multi-relayer configuration, however the current implementation assumes a single relayer in the network. A multiple relayer scheme is planned for the future.
{% endhint %}
