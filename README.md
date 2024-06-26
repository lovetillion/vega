![vega](https://lovetillion.org/i/vega.png)
# Vega
POC mainnet-js/libauth based adapter to trade Cauldron DEX Swaps

## Setup

* Make sure you have a Node.js and NPM environment setup
* Clone the repo
* ```cd vega```
* ```npm install```

## Instructions

* ```node vega.js [SEEDPHRASE]```

## Goal

Implement a trivial Swap transaction

## Currently implemented

### 1. Wallet Setup

- Requires a seed phrase (please be very careful with this!) to create your BCH and XLV wallet.

### 2. Security Check

- Download supported Bitcoin Cash Metadata Registry (BCMR)
- Compare hash from AuthHead of BCMR to fresh downloaded latest version
- Exit if there's a mismatch (potential security issue)

### 3. Wallet Information

- Shows your BCH wallet address and balance (BCH and XLV tokens)

### 4. Sending Test Transactions

- Can send BCH to other wallets
- Can send XLV CashTokens to other wallets

### Reference

* [Whitepaper](https://docs.riftenlabs.com/cauldron/whitepaper/)
* [Partial python test script](https://gist.githubusercontent.com/dagurval/7b84057868ca3512138466e0b2d4fb65/raw/d7082cb944d4be6c9749811a5494aa2bfb6765ae/gistfile1.txt)
* [Example Cauldron tx for 50 XLV](https://explorer.bitcoinunlimited.info/tx/35d73e7e5aa4942e3f1b7bcaf1b1c2f9897e863f37e68c2b9858759fd3e76c62)
* Currently studying how rostrum electrum server could by used via Python for the handling DEX contracts via CScript
