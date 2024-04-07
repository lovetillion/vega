import { BCMR, Wallet, utf8ToBin, sha256, OpReturnData, TokenSendRequest, TestNetWallet } from "mainnet-js";
import https from "https";
import crypto from "crypto";

const network = "mainnet"; // mainnet or chipnet
const walletClass = network == "mainnet" ? Wallet : TestNetWallet;
const tokenId = "3270f6641a815709c9c03e75e189563c1bb2f0814d8644a2181da896fb3405d0"; // XLV

// make sure we never hard code sensitive wallet data
const seedphrase = process.argv[2];

function downloadFile(url, callback) {
  https.get(url, (response) => {
    let data = "";

    // Handle data chunks
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Handle response completion
    response.on('end', () => {
      // Calculate SHA256 hash of the data
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      callback(hash);
    });
  }).on('error', (error) => {
    console.error('Error downloading file:', error);
  });
}


if ( seedphrase )
{
	const derivationPathAddress = "m/44'/145'/0'/0/0"; // last number is the address index from electron cash
	const wallet = await walletClass.fromSeed(seedphrase, derivationPathAddress);

	// not working
	const authChain = await BCMR.addMetadataRegistryAuthChain({
		  transactionHash: tokenId,
		  followToHead: false// update to true for production
	});
	const IdentitySnapshot = BCMR.getTokenInfo(tokenId);
	console.log( authChain[0].contentHash );
	console.log( authChain[0].httpsUrl );
	downloadFile( authChain[0].httpsUrl, (hash) => {
	  console.log('SHA256 hash of the JSON file:', hash);
		if ( hash != authChain[0].contentHash )
		{
			console.log('WARN: Inconsistency in BCMR');
			//process.exit(); // enable for production
		}
	});
	console.log( IdentitySnapshot );

	const walletAddress = wallet.getDepositAddress();
	const balance = await wallet.getBalance();
	console.log(`Connected to ${walletAddress} with balance ${balance.bch} BCH ${balance.sat} sats`);

	const allBalances = wallet.getAllTokenBalances();
	var balanace_cb = allBalances.then( function(result) {
		console.log( result[tokenId] + ' XLV' );
	});
	await allBalances;

	// working but disabled
	/*
	const txData = await wallet.send([
	{
		cashaddr: 'bitcoincash:',
		value: 0.0001,
		unit: 'bch',
	}
	]);
	*/

	// working but disabled
	/*
	const sendResponse = await wallet.send([
	  new TokenSendRequest({
		  cashaddr: 'bitcoincash:zz5dsw35sszyfs8auq7fd406rqe5vf3xhcy2rfks98',
		      tokenId: tokenId,
		      amount: 5000000000
		    })
	]);
	*/
}
else
{
	console.log( "You must specify a seedphrase. Example:\n\nnode vega.js \"this is my seed etc etc\"" );
}






process.exit();


