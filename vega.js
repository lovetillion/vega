import { Wallet, utf8ToBin, sha256, OpReturnData, TokenSendRequest, TestNetWallet } from "mainnet-js";

const network = "mainnet"; // mainnet or chipnet
const walletClass = network == "mainnet" ? Wallet : TestNetWallet;

//const wallet = await walletClass.fromSeed(seedphase, derivationPathAddress);
//const walletAddress = wallet.getDepositAddress();
//const balance = await wallet.getBalance();

console.log("Hello world!")
process.exit()
