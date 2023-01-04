import {
	getAddressBalance,
	getTransactions,
	getItemPrice,
	writeTransactions,
} from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

const buyerPrivateKey = process.argv[2];
const itemBought = process.argv[3];
// Add your code below
const transactions = getTransactions();
const price = getItemPrice(itemBought);
const keyPair = ec.keyFromPrivate(buyerPrivateKey);
const buyerPublicKey = keyPair.getPublic("hex");
const balance = getAddressBalance(buyerPublicKey);

let transaction = {
	buyerAddress: buyerPublicKey,
	sellerAddress: null,
	price,
	itemBought,
	signature: keyPair.sign(buyerPublicKey + price + itemBought).toDER("hex"),
};

if (price <= balance) {
	transactions.push(transaction);
	writeTransactions(transactions);
} else {
	console.log("Not enough balance");
}
