# Transfer verifier circuit overview

:::info

The following is from the libzeropool library description. For more details, please see

* [Library description ](https://hackmd.io/\_Xm5DjqUTyykcBtDgMxLwA)
* [libzeropool github repo](https://github.com/zeropoolnetwork/libzeropool)

:::

This circuit is used to built a private transactions engine with the following properties:&#x20;

1. It is not possible for anyone to forge balances.
2. Any unspent note or account with an existing owner is spendable.

**The circuit proves the following conditions:**

1. Input notes are unique.
2. Output notes are unique or blank (all fields equal zero).
3. Tx is signed and the signer is the owner of input account, output account, and input notes.
4. Nullifiers correspond to notes.
5. out\_commitment is the root of Merkle subtree of output account and notes.
6. Input account and notes should be inside anonymity set (have valid merkle proofs) or blank (all fields of account excluding η are zeros, balance of note is zero).
7. All non-blank input notes correspond to the following equation\
   `tx.in.Account.i≤pos(tx.in.Note)<tx.out.Account.i`\
   where pos is the position of the note in the Merkle tree.
8. Public balance, XP changes, and the size of anonymity set should be stored at special public δ input as little endian (b:i64, e:i96, i:u32), two’s complement is used for signed types. After unpacking, negative values should be represented as corresponding field elements.
9. Sum of all balances (with negative signs for outputs) should be zero.
10. Account indexes are limited:\
    `tx.in.Account.i≤tx.out.Account.i≤δ.i`
11. The following equation for XP:\
    `δ.e+(tx.out.Account.i−tx.in.Account.i)tx.in.Account.b+∑k(tx.out.Account.i−pos(tx.in.Notek))tx.in.Notek.b+tx.in.Account.e−tx.out.Account.e=0`

:::info

XP is referred to as energy in the zeropool library. While accounts accumulate XP there is no current application for accumulated XP in v1 of the protocol.&#x20;

:::

