import { decodeCashAddress, stringify, encodeCashAddress, hexToBin } from '@bitauth/libauth';

// eatBCH South Sudan
const address2 = 'bitcoincash:qrsrvtc95gg8rrag7dge3jlnfs4j9pe0ugrmeml950';
console.log( address2 )
const tokenAddress = decodeCashAddress(address2);
console.log(stringify(tokenAddress));

const publicKeyHash = tokenAddress.payload;

const acceptsTokens = encodeCashAddress({
  payload: publicKeyHash,
  prefix: 'bitcoincash',
  type: 'p2pkhWithTokens',
}).address;
console.log(acceptsTokens);

// bitcoincash:qrsrvtc95gg8rrag7dge3jlnfs4j9pe0ugrmeml950
// bitcoincash:zrsrvtc95gg8rrag7dge3jlnfs4j9pe0ugy3293rtu