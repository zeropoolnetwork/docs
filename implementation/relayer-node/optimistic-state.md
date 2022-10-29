---
description: Optimistic state description
---

# Optimistic State

### Optimistic State Addresses Congestion Issues

The relayer must calculate the new state root and generate the corresponding proof. The proof generation process is resource intensive and time-consuming, and all of the transactions and proof must be processed in a strict order since the old root value is used as an argument to a new proof. This creates a potential bottleneck and a risk of interference between users that could lead to system degradation, increased latency and so on.

There is no way to avoid the problem altogether but there could be some improvements and trade offs to be made. Specifically in the first version we introduce a so called "Optimistic client/relayer state" which seems like a a reasonable tradeoff between a much better UX and slightly worse reliability.

With optimistic state the relayer always assumes that a transaction will be eventually mined, unless proven otherwise (thus the name "optimistic"). This solution implies that the client sees a pending transaction and pending balance, which could be potentially rolled back by another invalid transaction, that was processed by the relayer a little earlier. Such an invalid transaction leads to cancellation of all of the subsequent transactions in the queue, so the user will have to resend those transactions once more.

{% hint style="warning" %}
It is essential that whatever happens with the client application or the relayer, all funds are protected by the on-chain smart contract, which acts as the ultimate backstop. You can always make a clean boot of the relayer and client applications.
{% endhint %}

### Technical Overview

* The client sends a transaction
* The relayer
  * receives a transaction
  * computes a new "Optimistic" root
  * schedules proof generation
  * saves the transaction to inner database
  * responses with some job Id
* The client synchronizes the state and sees the transaction as "pending", the balance is **unchanged**
* The async worker 1
  * takes a scheduled transaction
  * generates a proof
  * sends a transaction to the Pool contract
  * schedules Ethereum transaction status check by TxHash
* The async worker 2
  * Takes a TxHash
  * checks contract transaction execution status
  * If ok, the updates corresponding status in the Tx Db, otherwise it launches rollback mode and marks all the later transactions ( already processed by the relayer ) as failed
* The client eventually loads the updated transaction status. If the transaction was successful, then the balance is updated, otherwise the transaction is shown as failed.

![](<../../.gitbook/assets/optimistic state.png>)
