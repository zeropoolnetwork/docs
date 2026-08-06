# Functionality

Every user in ZeroPool is associated with her private spending key
$\sigma$.

ZeroPool maintains a set of accounts and notes. Each account and each note
stores some amount of tokens specified by its balance. Each note belongs to
some account. A user Alice who owns an account can join a note which belongs
to this account (destroying the note and and transferring its balance to
the account), or create a new note (transferring some of account balance to
it). She may choose to make the created note owned by a different account, say,
Bob's — which Bob can later join with his account. This way, accounts store the
balance of users and notes enable that balance to be fragmented and transferred
between accounts.

In other words, ZeroPool provides the following actions to a user Alice:

 - Creating a private ZeroPool account for spending key $\sigma$ chosen
   randomly by her.

 - Depositing tokens to a ZeroPool account $\sigma$ from a public account (on
   the underlying blockchain).

 - Creating notes that belong to another user Bob's account, and topping them
   up with tokens from Alice's account $\sigma$.

 - Joining the notes that belong to her account with it.

 - Withdrawing the tokens from her ZeroPool account $\sigma$ back to a public
   account (on the underlying blockchain).

In order to keep the action that Alice performs secret, we implement all five
using one single transaction type. Let $\sigma$ be Alice's spending key. Then
one ZeroPool transaction does the following:

1. consumes the existing account associated with spending key $\sigma$ and
   `INPUT` number of notes belonging to it,

2. creates a new account associated with $\sigma$ and `OUTPUT` number of notes
   which may belong to any (potentially different) accounts.

The consumed account and notes are called “input”, while the produced ones are
called “output” of the transaction. So the transaction always “overwrites” one
(input) account of the user with a new (output) one, optionally joining or
creating some notes in the process. In case input account equals to the special
zero value, the transaction will assume that output account is to be created
and initialized with zero balance. From this moment on, it can be used as input
to future transactions.

The transaction keeps private the account that was created or modified by the
transaction, as well as balances of all involved notes. We fix the numbers
of `INPUT` and `OUTPUT` notes to prevent leaking the actual number of notes
used. If the user wants to use less than `INPUT` or `OUTPUT` notes, she can pad
her desired note lists with special dummy zero values — the transaction will
recognize them and understand that they shouldn't be used.

The transaction reveals the difference between the total balance of input
account and its notes on one hand, and output account and notes on the other
hand. If the difference is negative (output is greater than input), this means
that the total number of tokens in the ZeroPool is going up and therefore the
transaction will expect the user to deposit the correct number of tokens to the
smart contract's public account (on the underlying blockchain). Symmetrically,
if the difference is positive, ZeroPool will allow the user to withdraw the
said difference of tokens from the smart-contract's account to a user specified
account. When the difference is zero, it means that the net balance of ZeroPool
hasn't changed and the transaction was only moving tokens within ZeroPool.
