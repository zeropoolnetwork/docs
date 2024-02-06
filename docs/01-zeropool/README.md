# ZeroPool Contract

ZeroPool is a smart-contract that implements private token transactions on
top of a public blockchain. One can deposit public tokens into their private
account inside ZeroPool, transfer them to other private accounts inside the
pool, and withdraw them back to a public account. Deposits to and withdrawals
from the pool are visible to everyone — since they alter account balances on
the underlying public blockchain — while the transactions inside the pool, as
well as the balances, and the structure of private accounts are hidden from
everyone but the corresponding account owners.

The core tool that allows ZeroPool to provide privacy on a public blockchain is
[zkSNARK](https://en.wikipedia.org/wiki/Non-interactive_zero-knowledge_proof)s.
We use [fawkes-crypto](/docs/fawkes-crypto) EDSL library to implement our
zkSNARK constraints.

We keep the following description high-level and omit the blockchain-specific
technicalities until the appropriate section. ZeroPool is agnostic to the
choice of the underlying blockchain, and its core engine can be augmented with
extra functionality if needed (for example, limiting the maximum transaction
amounts, verifying that transactions satisfy some extra conditions — all while
maintaining privacy).
