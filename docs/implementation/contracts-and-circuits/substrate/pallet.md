# Pallet

This is implementation of a Zero Knowledge proof-based anonymous transaction engine. The pallet provides functions to perform confidential transactions, where users can send and receive transactions privately without revealing any transaction details. It uses the alt_bn128 elliptic curve for generating proofs, which is efficient for this use case.

The pallet implements a Merkle tree structure to store transactions with a hash chain, where each new root hash includes the previous root hash. The pallet also includes a storage map to store nullifiers, which are unique identifiers for spent coins to prevent double-spending. The operator (relayer) is responsible for submitting new transactions to the pool and updating the current Merkle tree's root.

The pallet includes two verification keys, one for transfers and one for the Merkle tree. The owner of the pallet can manually change the verification keys, which are used for generating and verifying proofs.

The pallet provides functionality to transfer funds, deposit funds, and withdraw funds. Users can deposit funds into the system by signing a message that includes a recipient address and the amount. The pallet also allows users to transfer funds to another address while keeping the transaction details private. Withdrawals can only be made to an address that was previously used in a deposit or transfer.

## Source code

* [lib.rs](https://github.com/zeropoolnetwork/zeropool-substrate/blob/main/pallets/pallet-zeropool/src/lib.rs)