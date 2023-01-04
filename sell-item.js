import {
	getAddressItems,
	getItemPrice,
	getTransactions,
	writeTransactions,
} from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

const sellerPrivateKey = process.argv[2];
const itemSold = process.argv[3];
// Add your code below
const transactions = getTransactions();
const sellerKeyPair = ec.keyFromPrivate(sellerPrivateKey);
const sellerPublicKey = sellerKeyPair.getPublic("hex");
const price = getItemPrice(itemSold) - 5;
const items = getAddressItems(sellerPublicKey);
const hasItem = items[itemSold] > 0;

const transaction = {
	buyerAddress: null,
	sellerAddress: sellerPublicKey,
	price,
	itemSold,
	signature: sellerKeyPair
		.sign(sellerPublicKey + price + itemSold)
		.toDER("hex"),
};
console.log(items);
if (hasItem) {
	transactions.push(transaction);
	writeTransactions(transactions);
} else {
	console.log("Not in stock");
}
