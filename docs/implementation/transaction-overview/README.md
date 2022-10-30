---
description: An atomic operation on the blockchain
---

# Transaction Overview

The main purpose of any transaction is to move funds between parties. Each transaction has several inputs and outputs. [Account](../account-and-notes/accounts.md) and [notes](../account-and-notes/notes.md) can be used as inputs and outputs.

The current implementation assumes that each transaction has:

1. A single input and output account and&#x20;
2. A fixed number of input (3) and output (127) notes.

The input and output accounts designate a transaction initiator. Account changes (including balance, energy and spent offset) are reflected in the output account.

