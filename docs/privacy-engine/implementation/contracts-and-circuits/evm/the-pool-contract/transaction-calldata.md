---
description: Reference tables with calldata structure for different transaction types
---

# Transaction Calldata

All transaction data are transferred to the Pool contract through the calldata. The following reference table is useful for transaction analysis.

Withdrawal transactions contain addition fields `memo.nativeamount` and `memo.receiver`. Due to this, the calldata table for withdrawal transactions is presented separately.

## Deposit and Transfer

| Field                    | Size (bytes)              | Offset (bytes)             | Description                                                                                                                                                  |
| ------------------------ | ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| selector                 | 4                         | 0                          | Contract method selector (0xaf989083)                                                                                                                        |
| nullifier                | 32                        | 4                          | The unique [transaction nullifier](../../../transaction-overview/the-nullifiers.md)                                                                           |
| out\_commit              | 32                        | 36                         | Transaction commitment (transaction subtree root in the [Merkle tree](../../untitled/))                                                                      |
| tx\_index                | 6                         | 68                         | Transaction's first leaf index within Merkle tree (0-based counter)                                                                                          |
| energy\_amount           | 14                        | 74                         | Account XP delta (signed integer, Gwei)                                                                                                                      |
| token\_amount            | 8                         | 88                         | Account token delta (signed integer, Gwei)                                                                                                                   |
| tx\_proof                | 256                       | 96                         | zkSNARK proof                                                                                                                                                |
| root\_after              | 32                        | 352                        | Merkle tree root after adding the transaction                                                                                                                |
| tree\_proof              | 256                       | 384                        | zkSNARK proof                                                                                                                                                |
| tx\_type                 | 2                         | 640                        | <p>0 - deposit</p><p>1 - transfer</p><p>2 - withdraw</p>                                                                                                     |
| memo\_size               | 2                         | 642                        | The following memo block size in bytes                                                                                                                       |
| memo.fee                 | 8                         | 644                        | The tokens amount to be transferred to the operator (the Pool contract will multiply the fee by denominator)                                                 |
| memo.ItemsNum            | 4                         | 652                        | Number of encrypted items in the memo block                                                                                                                  |
| memo.Hash\_acc           | 32                        | 656                        | Output account hash (with updated balance)                                                                                                                   |
| memo.Hash\_notes         | 32 * (memo.ItemsNum - 1)  | 688                        | Output note hash                                                                                                                                             |
| memo.Ap\_x               | 32                        | 656 + 32 * memo.ItemsNum   | Ephemeral public key (using to decrypt `memo.keys_enc` by transaction sender)                                                                                |
| memo.keys\_enc           | 32 * memo.ItemsNum + 16   | 688 + 32 * memo.ItemsNum   | Account and notes encryption keys                                                                                                                            |
| memo.acc\_enc            | 86                        | 704 + 64 * memo.ItemsNum   | Encrypted account with an updated balance                                                                                                                    |
| memo.notes\_enc          | 108 * (memo.ItemsNum - 1) | 790 + 64 * memo.ItemsNum   | <p>A single encrypted note $$(A_i, Note_i^{enc})$$ takes 108 bytes:</p><p>$$sizeof(A_i) = 32$$<br />$$sizeof(Note_i^{enc}) = 76$$</p>                         |
| ECDSA signature `(r, s)` | 64                        | 682 + 172 * memo.ItemsNum  | Used to recover deposit spender in the corresponding transactions                                                                                            |

## Withdrawal

| Field                    | Size (bytes)              | Offset (bytes)             | Description                                                                                                                                                  |
| ------------------------ | ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| selector                 | 4                         | 0                          | Contract method selector (0xaf989083)                                                                                                                        |
| nullifier                | 32                        | 4                          | The unique [transaction nullifier](../../../transaction-overview/the-nullifiers.md)                                                                           |
| out\_commit              | 32                        | 36                         | Transaction commitment (transaction subtree root in the [Merkle tree](../../untitled/))                                                                      |
| tx\_index                | 6                         | 68                         | Transaction's first leaf index within Merkle tree (0-based counter)                                                                                          |
| energy\_amount           | 14                        | 74                         | Account energy delta (signed integer, Gwei)                                                                                                                  |
| token\_amount            | 8                         | 88                         | Account token delta (signed integer, Gwei)                                                                                                                   |
| tx\_proof                | 256                       | 96                         | zkSNARK proof                                                                                                                                                |
| root\_after              | 32                        | 352                        | Merkle tree root after adding the transaction                                                                                                                |
| tree\_proof              | 256                       | 384                        | zkSNARK proof                                                                                                                                                |
| tx\_type                 | 2                         | 640                        | <p>0 - deposit</p><p>1 - transfer</p><p>2 - withdraw</p>                                                                                                     |
| memo\_size               | 2                         | 642                        | The following memo block size in bytes                                                                                                                       |
| memo.fee                 | 8                         | 644                        | The tokens amount to be transferred to the operator (the Pool contract will multiply the fee by denominator)                                                 |
| _memo.nativeamount_      | 8                         | 652                        | Count of the native coin to withdraw                                                                                                                         |
| _memo.receiver_          | 20                        | 660                        | Destination native address for withdrawal                                                                                                                    |
| memo.ItemsNum            | 4                         | 680                        | Number of encrypted items in the memo block                                                                                                                  |
| memo.Hash\_acc           | 32                        | 684                        | Output account hash (with updated balance)                                                                                                                   |
| memo.Hash\_notes         | 32 * (memo.ItemsNum - 1)  | 716                        | Output note hash                                                                                                                                             |
| memo.Ap\_x               | 32                        | 684 + 32 * memo.ItemsNum   | Ephemeral public key (using to decrypt `memo.keys_enc` by transaction sender)                                                                                |
| memo.keys\_enc           | 32 * memo.ItemsNum + 16   | 716 + 32 * memo.ItemsNum   | Account and notes encryption keys                                                                                                                            |
| memo.acc\_enc            | 86                        | 732 + 64 * memo.ItemsNum   | Encrypted account with an updated balance                                                                                                                    |
| memo.notes\_enc          | 108 * (memo.ItemsNum - 1) | 818 + 64 * memo.ItemsNum   | <p>A single encrypted note $$(A_i, Note_i^{enc})$$ takes 108 bytes:</p><p>$$sizeof(A_i) = 32$$<br />$$sizeof(Note_i^{enc}) = 76$$</p>                         |
| ECDSA signature `(r, s)` | 64                        | 710 + 172 * memo.ItemsNum  | Used to recover deposit spender in the corresponding transactions                                                                                            |