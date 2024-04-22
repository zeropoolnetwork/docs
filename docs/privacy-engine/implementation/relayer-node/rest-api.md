---
description: To interact with the relayer
---

# REST API

## Send a transaction to the contract

| Method | Path | Summary |
|--------|------|---------|
| POST | /transaction | This method checks an incoming transaction, builds the zkSNARK Merkle tree proof, and sends the transaction to the Pool contract. The transaction doesn't process immediately because contract interaction is completed in a serial manner. Incoming transactions are put into the job queue. The method returns `jobId` on success. |

### Request Parameters

| Parameter | In | Type | Required | Description |
|-----------|---|------|----------|-------------|
| proof | body | Dictionary | true | Transaction proof (built by a client) |
| memo | body | String | true | Memo block, Base64-encoded |
| tx_type | body | Integer | true | 0: deposit, 1: transfer, 2: withdrawal |
| depositSignature | body | String | false | Account nullifier signature with the client's native chain private key (for withdrawal tx only) |

### Responses

| Status | Description |
|--------|-------------|
| 201: Created | Transaction has been pushed to the job queue |
| 400: Bad Request | Error while parsing the input JSON |
| 500: Internal Server Error | Something went wrong |

## Get the job status

| Method | Path | Summary |
|--------|------|---------|
| GET | /job/:id | Returns incoming transaction processing state. `jobId` is returned by /transaction method. |

### Request Parameters

| Parameter | In | Type | Required | Description |
|-----------|---|------|----------|-------------|
| id | query | Integer | true | Job identifier |

### Responses

| Status | Description |
|--------|-------------|
| 200: OK | Job status in body |
| 404: Not Found | Job with specified ID not found |
| 500: Internal Server Error | Something went wrong |

## Query transactions

| Method | Path | Summary |
|--------|------|---------|
| GET | /transactions/:limit/:offset | Returns memo blocks and out commits for transactions at the specified offset. This method is used by clients to synchronize account state. |

### Request Parameters

| Parameter | In | Type | Required | Description |
|-----------|---|------|----------|-------------|
| limit | query | Integer | true | Number of transactions to query |
| offset | query | Integer | true | The Index of the first transaction (in the Merkle tree, should be a multiple of 128) |

### Responses

| Status | Description |
|--------|-------------|
| 200: OK | Array of requested transactions |
| 400: Bad Request | Check query parameters |
| 500: Internal Server Error | Something went wrong |

## Get Merkle tree proofs at the specified position

| Method | Path | Summary |
|--------|------|---------|
| GET | /merkle/proof?[index] | Get Merkle tree proofs at the specified position |

### Responses

| Status | Description |
|--------|-------------|
| 200: OK | Success |
| 404: Not Found | Specified index doesn't exist in the current tree |
| 500: Internal Server Error | Something went wrong |

## Get Merkle tree root node at the specified index

| Method | Path | Summary |
|--------|------|---------|
| GET | /merkle/root/:index | Get Merkle tree root node at the specified index |

### Request Parameters

| Parameter | In | Type | Required | Description |
|-----------|---|------|----------|-------------|
| index | query | Integer | false | - |

### Responses

| Status | Description |
|--------|-------------|
| 200: OK | Success |
| 404: Not Found | Index not exist in the Merkle tree |
| 500: Internal Server Error | Something went wrong |

## Calculate transaction proof

| Method | Path | Summary |
|--------|------|---------|
| POST | /proof_tx | Builds zkSNARK proof for the transaction based on public and secret transaction input calculated by a client. **WARNING:** This is a debug method used to decrease client overhead. DO NOT use in production, as the client should pass public and secret transactional data. This significantly decreases overall security! |

### Request Parameters

| Parameter | In | Type | Required | Description |
|-----------|---|------|----------|-------------|
| pub | body | Dictionary | true | Public inputs for the circuit |
| sec | body | Dictionary | true | Secret inputs for the circuit |

### Responses

| Status | Description |
|--------|-------------|
| 200: OK | Proof has been calculated successfully |
| 400: Bad Request | Error in the public or secret input |
| 500: Internal Server Error | Something went wrong |

## Get the next index in the Merkle tree

| Method | Path | Summary |
|--------|------|---------|
| GET | /delta_index | Get the next index in the Merkle tree |

### Responses

| Status | Description |
|--------|-------------|
| 200: OK | An integer value of the index |
| 500: Internal Server Error | Something went wrong |

## Get current Merkle tree root and delta index

| Method | Path | Summary |
|--------|------|---------|
| GET | /info | Get current Merkle tree root and delta index |

### Responses

| Status | Description |
|--------|-------------|
| 200: OK | Success |
| 500: Internal Server Error | Something went wrong |