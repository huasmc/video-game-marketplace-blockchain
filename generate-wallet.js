import {
	getTransactions,
	writeTransactions,
	getWallets,
	writeWallets,
} from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

const newWalletName = process.argv[2];
// Add your code below

const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic("hex");
const privateKey = keyPair.getPrivate("hex");

const wallets = getWallets();

wallets[newWalletName] = { publicKey: publicKey, privateKey: privateKey };

if (newWalletName) writeWallets(wallets);

const transaction = {
	buyerAddress: null,
	sellerAddress: publicKey,
	price: 40,
};

const transactions = getTransactions();

transactions.push(transaction);

writeTransactions(transactions);
