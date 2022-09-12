const ecc = require("tiny-secp256k1");
const {BIP32Factory} = require("bip32");
const bip32 = BIP32Factory(ecc);
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

//Network
const network = bitcoin.networks.bitcoin;
//const path = m/0'/0'/k';

const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

const root = bip32.fromSeed(seed, network);

const account = root.derivePath("m/44/0/0/0");
const node = account.derive(0).derive(0);

const btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

console.log(
  `Address: ${btcAddress}, Mnemonic: ${mnemonic}`
);
