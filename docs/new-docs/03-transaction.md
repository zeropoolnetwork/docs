# Transaction Overview

As mentioned in [Overview](overview), ZeroPool encodes all possible actions a
user may want to perform on the pool with a single transaction type. A ZeroPool
transaction consumes one account (associated with user's spending key $\sigma$)
and `INPUT` number of notes that belong to this account. In their place, it
creates a new account (associated with the same spending key $\sigma$ as the
old one) and `OUTPUT` number of new notes. The created new notes may belong to
accounts of other users (with keys different from $\sigma$). Consumed account
and notes can not be used again.

There may exist no more than one account associated with a given spending key
$\sigma$ at any single moment.

:::tip

Since the consumed and newly created account have the same associated
key $\sigma$ and belong to the same user, one can also view them as two
instantiations of the same account, and transaction as modifying this account
(overwriting some fields in it).

:::

## Keys

The spending key $\sigma$ is the main key that controls the account and from
which all the other keys — private and public — are derived. The following
diagram shows the keys ZeroPool uses and the dependencies between them. We
use straight arrows for deterministic mappings (which always produce the same
value) and snake-shaped arrows for randomized mappings (that can be run with
the same input many times and produce different random output each time).

![ZeroPool Keys Diagram](diagrams/zeropool-keys.png)

 - Spending key $\sigma$ is used to sign each transaction, which is then
   verified using verifier key $A$.

   The $\sigma$ is necessary for spending ZeroPool tokens. It's supposed to
   never leave user's device, and is only used to sign transactions locally.

 - Intermediate key $\eta$ identifies user's account in a transaction. User
   uses $\eta$ to create transactions, and later to prove the transaction
   correctness using a zkSNARK proof. In zkSNARK, $\eta$ is treated as a secret
   input so proof of transaction's correctness does not reveal $\eta$.

   Compromising $\eta$ will deanonymize the user, but won't allow the tokens to
   be stolen (assuming that $\sigma$ is not compromised).

 - The diversified address $(d, P_d)$ is used as anonymous address that a user
   gives to others in order to receive tokens (through notes) from them. It
   does not reveal the user's $\eta$, but allows the user who presents the
   correct $\eta$ to claim the tokens sent to this diversified address.

   A user can generate as many diversified addresses as she wants from the
   same $\eta$. If two different senders send tokens to the same diversified
   address, they won't learn anything about each other's transations.

 - The receiving and outgoing keys are picked fresh for each transaction and
   used by the receivers of notes to decrypt notes posted on some public medium
   (**TODO: Which one?**).

## Sequence of Accounts and Notes

ZeroPool organizes all accounts and notes in a long, evergrowing sequence. Each
new transaction appends one account and `OUTPUT` notes to this sequence. We
only append values to the sequence via transactions, and never delete or modify
values that were added before.

Since every transaction creates exactly one account and `OUTPUT` notes, the
sequence will contain them exactly in this order: each $(\texttt{OUTPUT}+1)$-th
element is an account, and everything in-between is notes.

![](diagrams/transaction-acting-on-a-list.png)

Consider the illustration above. Accounts are drawn as boxes and notes as
circles. We chose `OUTPUT` = 3 here (in practice `OUTPUT` will be much larger),
and the white accounts and notes belong to unspecified users (different from
Alice).

It shows how the sequence of accounts and notes changes when a transaction
happens. In this example, user Alice transfers some tokens to three other
users. Doing so, she consumers her (always unique, identified by her spending
key $\sigma$) account (first green box) and some notes (green circles), and
transfers the tokens held by these to her new account (the second green box)
and three new notes which will belong to the recepient accounts.

The ordering of notes that Alice's transation consumes with respect to her
account is not important, i.e. the consumed notes can be located both to the
left or to the right of the account in the sequence. But with respect to each
other, the notes are always consumed in the order in which they appear in the
sequence. If you own notes X, Y, Z that go in this order and you decide to
consume only X and Z, ZeroPool will treat Y as consumed too and forever lock
the tokens it's holding. Alice's account associated with her spending key
$\sigma$ is unique, so there's only one account that can serve as input to the
transaction that Alice performs.

:::info

Since the ordering between accounts and notes is not important for the
transaction, logically, it may be convenient to see this sequence as two
separate sequences merged together, one for accounts and one for notes.

:::

### Account Structure

An Account in ZeroPool is described by four fields:

1. Intermediate key $\eta$ of the account's owner.
2. Spent offset $i$.
3. Balance $b$, the amount of tokens that the account holds.
4. Random salt $t$.

The $\eta$ here binds the account to is owner. Balance $b$ tells how many
tokens the note is holding. And random salt $t$ is there just to make sure
that hash of the account doesn't reveal anything about the fields.

The field $i$ is pointing at some position in the sequence of accounts and
notes. All the notes belonging to this account that are located to the left
of $i$ are considered joined (spent), and the ones in position $i$ and to the
right of it are available for spending.

![Account spent offset](diagrams/account-spent-offset.png)

The picture above illustrates the meaning of spent offset. White accounts
and notes here stand for ones that belong to users other than Alice.

When Alice performs a transaction joining some notes, she will change the
spent offser of her account from old value $i$ to new $i'$. And during that
transaction, she can join the notes that are located between indices $i$ and
$i'$ in the sequence (thus maintaining the invariant). The current position of
Alice's account has no effect on the notes that she can join with that account,
i.e. the joined notes can go either before of after the account (green box on
the picture).

### Note Structure

A Note in ZeroPool is described by the following three fields:

1. $(d, P_d)$, diversified public address this note belongs to.
2. Balance $b$.
3. Random salt $t$.

Balance $b$ and salt $t$ here have the same meaning as in account.

The diversified public address $(d, P_d)$ is binding a note to the account it's
owned by. The values $d$ and $P_d$ are derived from $\eta$, but don't reveal
$\eta$ itself. In order to join a note, the user must provide the value $\eta$
and an account (belonging to $\eta$) to join the note with.

:::info

**TODO: What's written here is inaccurate. It's not zero hashes, it's all fields
being set to 0 make accounts and notes behave in a special way.**

In practice, a lot of the time we will be working with hashes of account
and note structures. Hash values equal to zero have special meaning in
ZeroPool.

- Special zero account is used to create new accounts: zero account has $0$
  balance, no notes are associated with it and it can be spent multiple times
  with any spending key $\sigma$. If you want to create a new account, you
  "spend" the zero account with your freshly sampled key $\sigma$, and after
  that you can start using your new account in future transactions.

- Zero note hash means "do not use this note". Since the number of `INPUT` and
  `OUTPUT` notes transaction works on is fixed (to avoid privacy leakage), we
  need a way to encode dummy notes that are not to be used if the user wants to
  use less of them, and zero note hashes do just that.

Due to collision resistance, we're extremely unlikely to ever encounter account
or note values that will actually hash to zero. Therefore, it's safe to treat
zero hashes as special values.

:::

## Merkle Tree Commitment

ZeroPool smart-contract does not store the whole sequence of nodes and
accounts, but instead only holds the (publicly known) commitment to it. We
use Merkle Tree to commit to the whole sequence of accounts and notes, and
incrementally append values to it.

Consider a Merkle Tree of height $h$. To store the sequence $s_0, s_1 \dots
s_{n-1}$ of accounts and notes in it, we assign first (going from left to
right) $n$ leaves of the tree hashes $H(s_0), H(s_1) \dots H(s_{n-1})$ and fill
the remaining $2^h - n$ leaves with zeroes. And we compute the values of all
inner nodes according to the usual Merkle Tree rule. (If no transactions have
happened yet and the sequence is empty, all leaves of the Merkle Tree will be
initialized with zeroes.)

This way, for any sequence element $s_k$, its index $k$ can be naturally
interpreted as the path to the leaf where $H(s_k)$ is stored: decompose number
$k$ into $h$ bits and treat $0$s and $1$s in it as a sequence of "left" and
"right" turns leading from the tree root to a leaf. One can also efficiently
recompute the Merkle Tree if some leaf is modified, or even multiple leaves in
bulk by updating a subtree. We've covered this in [Background](background).

Even though Merkle Tree allows modifying any leaf, including the ones we've
assigned before, we only use this functionality to append values to the
sequence and never modify elements that were added to it before. Say, if the
Merkle Tree leaves currently currently have values

$$
H(s_0), H(s_1) \dots H(s_{n-1}), 0, 0 \dots 0
$$

assigned to them, the only modification we will do is assigning value
$H(s_{n})$ to leaf $n$.

Using Merkle Tree commitment to implement a sequence of accounts and notes in
ZeroPool means that the total length of the sequence can never exceed $2^h$.

## zkSNARK Constraint Systems

**TODO: Where to introduce nullifiers?**

The global state maintained by the ZeroPool smart-contract is given by the root
hash of Merkle Tree containing accounts and notes sequence. The smart-contract
allows anyone to replace the root it stores with a new value only if the
sequence commited to by the new root is obtained from the old one by applying a
valid transaction to it.

TODO: Introduce zkSNARK CSes.

The public inputs of CSes are:

 - root
 - nullifier
 - out_commit
 - delta
