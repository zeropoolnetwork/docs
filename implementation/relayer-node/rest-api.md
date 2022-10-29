---
description: To interact with the relayer
---

# REST API

{% swagger method="post" path="/transaction" baseUrl="http://relayer" summary="Send a transaction to the contract" %}
{% swagger-description %}
This method checks an incoming transaction, builds the zkSNARK Merkle tree proof, and sends the transaction to the Pool contract. The transaction doesn’t process immediately because contract interaction is completed in a serial manner. Incoming transactions are put into the job queue. The method returns 

`jobId`

 on success
{% endswagger-description %}

{% swagger-parameter in="body" name="proof" type="Dictionary" required="true" %}
Transaction proof (built by a client)
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="memo" type="String" %}
Memo block, Base64-encoded
{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="tx_type" type="Integer" %}
0: deposit, 1: transfer, 2: withdrawal
{% endswagger-parameter %}

{% swagger-parameter in="body" required="false" name="depositSignature" type="String" %}
Account nullifier signature with the client's native chain private key (for withdrawal tx only)
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Transaction has been pushed to the job queue" %}
```javascript
{
    "jobId": "1"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Error while parsing the input JSON" %}
```javascript
{
    error: "Error while parsing the input JSON",
    description: "tx_type is incorrect"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Something went wrong" %}
```javascript
{
    error: "An internal error has occured. Please try again later",
    description: "optional error description"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/job/:id" baseUrl="http://relayer" summary="Get the job status" %}
{% swagger-description %}
Returns incoming transaction processing state. 

`jobId`

 is returned by /transaction method
{% endswagger-description %}

{% swagger-parameter in="query" name="id" type="Integer" required="true" %}
Job identifier
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Job status in body" %}
```javascript
{
    "state": "failed",
    "txHash": null
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Job with specified ID not found" %}
```javascript
"Job 2 not found"
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Something went wrong" %}
```javascript
{
    error: "An internal error has occured. Please try again later",
    description: "optional error description"
}}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/transactions/:limit/:offset" baseUrl="http://relayer" summary="Query transactions" %}
{% swagger-description %}
Returns memo blocks and out commits for transactions at the specified offset. This method is used by clients to synchronize account state.
{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="Integer" required="true" %}
Number of transactions to query
{% endswagger-parameter %}

{% swagger-parameter in="query" name="offset" type="Integer" required="true" %}
The Index of the first transaction (in the Merkle tree, should be  a multiple of 128)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Array of requested transactions" %}
```javascript
[
    (Buffer|null)
]
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Check query parameters" %}
```javascript
{
    error: "Incorrect parameters",
    description: "limit is too high"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Something went wrong" %}
```javascript
{
    error: "An internal error has occured. Please try again later",
    description: "optional error description"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/merkle/proof?[index]" baseUrl="http://relayer" summary="Get Merkle tree proofs at the specified position" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    root, // Merkle tree root for this proofs
    deltaIndex, // this index should be used for building tx proof
    proofs // Merkle tree proofs
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Specified index doesn't exist in the current tree" %}
```javascript
"Incorrect index"
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Something went wrong" %}
```javascript
{
    error: "An internal error has occured. Please try again later",
    description: "optional error description"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/merkle/root/:index" baseUrl="http://relayer" summary="Get Merkle tree root node at the specified index" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="index" type="Integer" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
"11469701942666298368112882412133877458305516134926649826543144744382391691533"
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Index not exist in the Merkle tree" %}
```javascript
"Index not exist in the Merkle tree"
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Something went wrong" %}
```javascript
{
    error: "An internal error has occured. Please try again later",
    description: "optional error description"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/proof_tx" baseUrl="http://relayer" summary="Calculate transaction proof" %}
{% swagger-description %}
Builds zkSNARK proof for the transaction based on public and secret transaction input calculated by a client.

**WARNING:** This is a debug method used to decrease client overhead. DO NOT use  in production, as the client should pass public and secret transactional data. This significantly decreases overall security!
{% endswagger-description %}

{% swagger-parameter in="body" name="pub" type="Dictionary" required="true" %}
Public inputs for the circuit
{% endswagger-parameter %}

{% swagger-parameter in="body" name="sec" type="Dictionary" required="true" %}
Secret inputs for the circuit
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Proof has been calculated successfully" %}
```javascript
{
    proof // Transaction proof
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Error in the public or secret input" %}
```javascript
{
    error: "Error while parsing the input JSON",
    description: "cannot find pub field"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Something went wrong" %}
```javascript
{
    error: "An internal error has occured. Please try again later",
    description: "optional error description"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/delta_index" baseUrl="http://relayer" summary="Get the next index in the Merkle tree" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-response status="200: OK" description="An integer value of the index" %}
0
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Something went wrong" %}
```javascript
{
    error: "An internal error has occured. Please try again later",
    description: "optional error description"
}
```


{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/info" baseUrl="http://relayer" summary="Get current Merkle tree root and delta index" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-response status="200: OK" description="Success" %}
```javascript
{
    "root": "11469701942666298368112882412133877458305516134926649826543144744382391691533",
    "deltaIndex": 0
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Something went wrong" %}
```javascript
{
    error: "An internal error has occured. Please try again later",
    description: "optional error description"
}
```
{% endswagger-response %}
{% endswagger %}

