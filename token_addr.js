// based on https://github.com/bitauth/libauth/blob/master/docs/addresses.md

import { decodeCashAddress, stringify, encodeCashAddress, hexToBin } from '@bitauth/libauth';

const input_addr = process.argv[2];

if ( input_addr )
{
	const address2 = input_addr;
	const tokenAddress = decodeCashAddress(address2);
	console.log(stringify(tokenAddress));

	const publicKeyHash = tokenAddress.payload;

	const acceptsBCH = encodeCashAddress({
	  payload: publicKeyHash,
	  prefix: 'bitcoincash',
	  type: 'p2pkh',
	}).address;
	console.log(acceptsBCH);

	const acceptsTokens = encodeCashAddress({
	  payload: publicKeyHash,
	  prefix: 'bitcoincash',
	  type: 'p2pkhWithTokens',
	}).address;
	console.log(acceptsTokens);
}
else
{
	console.log( "You must specify an address. Example:\n\nnode token_addr.js bitcoincash:ADDRESS" );
}

// Test - eatBCH South Sudan Address
// bitcoincash:qrsrvtc95gg8rrag7dge3jlnfs4j9pe0ugrmeml950
// bitcoincash:zrsrvtc95gg8rrag7dge3jlnfs4j9pe0ugy3293rtu
