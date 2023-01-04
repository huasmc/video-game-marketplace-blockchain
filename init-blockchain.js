import { writeBlockchain, writeTransactions } from "./blockchain-helpers.js";
// Add your code below

// Genesis block hardcoded; it doesn't have a previous block to generate hash
const genesisBlock = {
	hash: "0",
	previousHash: null,
};

writeBlockchain([genesisBlock]);
writeTransactions([]);
