---
description: Main transaction processor
---

# ZeroPool Contract

The main purpose of the ZeroPool contract is to process user transactions. It receives transactions from operators (relayers) or users directly, checks the proofs, and updates the current contract state.

### ZeroPool Initialization

Each pool serves a single token. To support multi-pool solutions every pool has it's own identifier (`pool_id`). Currently the pool\_id is an unsigned 24-bit arbitrary integer.

All linked contracts (verifiers, operator manager, token, and voucher token) should be provided prior to Pool contract deployment. The Pool contract is initialized by the following constructor method:

```solidity
constructor(uint256 __pool_id, IERC20 _token, IMintable _voucher_token, uint256 _denominator, uint256 _energy_denominator, uint256 _native_denominator, 
    ITransferVerifier _transfer_verifier, ITreeVerifier _tree_verifier, IOperatorManager _operatorManager, uint256 _first_root)
```

### Denominators

There are two denominators used in the Pool and applied to the token (`TOKEN_DENOMINATOR`_)_ and native coin (`NATIVE_DENOMINATOR`).   They are initially defined as 1 gwei constants.

```solidity
uint256 constant TOKEN_DENOMINATOR = 1 gwei;
uint256 constant NATIVE_DENOMINATOR = 1 gwei;
```

:::info

Example usage: When a user wants to withdraw 5 tokens from the pool, they specify '5' as the value in the corresponding transaction field. The pool will multiply this value by the TOKEN\_DENOMINATOR and send the resulting token value to the receiver address (in wei).

:::

### Root Parameter

The initial Merkle tree root value should be provided for the `_root` parameter. For a Merkle tree with a desired total height 48 without any leaves (all leaves are zero) the root is a fixed value:

```
11469701942666298368112882412133877458305516134926649826543144744382391691533
```



### Making a transaction

The Pool contract processes incoming transactions via the `transact()` method. All required data for the transaction passes through the calldata.

```solidity
function transact() external payable onlyOperator;
```

Before the transaction is processed the proofs are checked by the verifier contracts.

:::info

Note the `onlyOperator` modifier. It checks the transaction sender address via the Operator Manager and reverts a transaction when the origin sender is not currently allowed to interact with the Pool contract.

:::

### Source data

* The contract source code: [Pool.sol](https://github.com/zeropoolnetwork/pool-evm-single-l1/blob/main/contracts/Pool.sol)




