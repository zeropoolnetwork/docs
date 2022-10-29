---
description: Manages relayers access to the Pool
---

# Operator Manager Contract

{% hint style="info" %}
The **operator** is a native chain address which interacts with the Pool contract. In general the relayer or a standalone user can become the operator. In most cases the operator is a relayer.
{% endhint %}

The Operator Manager contract organizes and limits operators access to the Pool. Transactions should be appended to the Merkle tree strictly in a serial manner. The relayer node (or a user in case of direct Pool interaction) should calculate a Merkle tree proof (zkSNARK) before sending a transaction.&#x20;

However, the transaction will revert if the Merkle tree has changed during this calculation. If several relayers send transactions simultaneously collisions will appear and the transaction will be unsuccessful (along with spent gas fees).

To prevent this case we restrict Pool interactions using the Operator Manager contract. The Operator manager contract has three methods:

#### 1) `operator`

```solidity
function operator() external view returns (address);
```

Returns current operator address of the pool.


### Source and Deployment data

* The contract interface source code: [IOperatorManager.sol](https://github.com/zeropoolnetwork/pool-evm-single-l1/blob/main/contracts/consensus/IOperatorManager.sol)

