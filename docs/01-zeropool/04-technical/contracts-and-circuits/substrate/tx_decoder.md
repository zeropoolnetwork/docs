# Tx Decoder

:::info
 You can get more details about ZeroPool transaction format [here](../evm/the-pool-contract/transaction-calldata)
:::

This is a Rust code for a transaction decoder that extracts various transaction fields from the raw bytes. It decodes an EVM transaction format to something more native. The transaction fields include the nullifier, commitment, transfer index, energy amount, token amount, delta, proof, root, memo, memo size, memo fee, memo native amount, memo address, and ciphertext.

The TxType enum defines different types of transactions, including Deposit, Transfer, and Withdraw. The TxDecoder struct defines the new method that takes a byte array as an input and returns an instance of the TxDecoder struct.

The nullifier, out_commit, transfer_index, energy_amount, token_amount, delta, transact_proof, root_after, tree_proof, tx_type, memo_size, memo_message, memo_fee, memo_native_amount, memo_address, and ciphertext methods are used to extract the respective transaction fields from the byte array.

The num, ensure_twos_complement, and decode_proof methods are utility methods used to extract a U256 value from a byte array, ensure two's complement representation, and decode a proof, respectively.


## Source code

* [tx_decoder.rs](https://github.com/zeropoolnetwork/zeropool-substrate/blob/main/pallets/pallet-zeropool/src/tx_decoder.rs)