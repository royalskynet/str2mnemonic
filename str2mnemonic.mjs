#!/usr/bin/env node
// usage: node str2mnemonic.mjs "your string" [12|24]
import { createHash } from 'crypto';
import bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';

const input = process.argv[2];
const words = parseInt(process.argv[3] ?? '24', 10);
if (!input) { console.error('usage: node str2mnemonic.mjs "string" [12|24]'); process.exit(1); }
if (![12, 24].includes(words)) { console.error('words must be 12 or 24'); process.exit(1); }

const full = createHash('sha256').update(input, 'utf8').digest();
const entropy = words === 24 ? full : full.subarray(0, 16);
const mnemonic = bip39.entropyToMnemonic(entropy);
const seed = bip39.mnemonicToSeedSync(mnemonic);
const { key } = derivePath("m/44'/501'/0'/0'", seed.toString('hex'));
const kp = Keypair.fromSeed(key);

console.log('input    :', input);
console.log('entropy  :', entropy.toString('hex'));
console.log('mnemonic :', mnemonic);
console.log('pubkey   :', kp.publicKey.toBase58());
