import { Wallet, utf8ToBin, sha256, OpReturnData, TokenSendRequest, TestNetWallet } from "mainnet-js";

const network = "mainnet"; // mainnet or chipnet
const walletClass = network == "mainnet" ? Wallet : TestNetWallet;
const tokenId = "3270f6641a815709c9c03e75e189563c1bb2f0814d8644a2181da896fb3405d0"; // XLV

// make sure we never hard code sensitive wallet data
const seedphrase = process.argv[2];
if ( seedphrase )
{
	const derivationPathAddress = "m/44'/145'/0'/0/0"; // last number is the address index from electron cash
	const wallet = await walletClass.fromSeed(seedphrase, derivationPathAddress);

	// not working
	//const IdentitySnapshot = BCMR.getTokenInfo(tokenId);
	//console.log( IdentitySnapshot );

	const walletAddress = wallet.getDepositAddress();
	const balance = await wallet.getBalance();
	console.log(`Connected to ${walletAddress} with balance ${balance.bch} BCH ${balance.sat} sats`);

	// not working
	//const tokenBalance = wallet.getTokenBalance(tokenId);
	//console.log(`XLV balance ${JSON.stringify(tokenBalance)}`);

	// working but disabled
	/*
	const txData = await wallet.send([
	{
		cashaddr: 'bitcoincash:',
		value: 0.0085,
		unit: 'bch',
	}
	]);
	*/
}
else
{
	console.log( "You must specify a seedphrase. Example:\n\nnode vega.js \"this is my seed etc etc\"" );
}

process.exit()
