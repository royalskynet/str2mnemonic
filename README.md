# str2mnemonic

字串 → BIP39 助記詞 → Solana 地址的離線確定性生成器。
Deterministic offline generator: string → BIP39 mnemonic → Solana address.

---

## 中文

### 用途
輸入任意字串，產出對應的 BIP39 助記詞與 Solana 公鑰。同字串永遠對應同助記詞與同地址。等同 [iancoleman.io/bip39](https://iancoleman.io/bip39/) 「字串 → SHA-256 → Entropy → Mnemonic」流程，但**完全離線、單檔可審**。

### 安全警告
- **字串就是種子**：別人猜到字串就拿走全部資產。常見字、生日、歌詞秒爆。
- **只當實驗用或冷錢包派生**，**禁止**放主要資產。
- 真正主錢包請用 `solana-keygen new` 由系統熵產生，不要用本工具。
- 跑之前**拔網路線**。

### 安裝
```bash
git clone <this-repo>
cd str2mnemonic
npm install
```

### 用法
```bash
node str2mnemonic.mjs "你的字串"        # 24 字助記詞（預設）
node str2mnemonic.mjs "你的字串" 12      # 12 字助記詞
```

### 輸出範例
```
input    : hello world
entropy  : b94d27b9934d3e08a52e52d7da7dabfa
mnemonic : rich hard unveil charge stadium affair net ski style stadium helmet void
pubkey   : EDo5PinXBHhsg7XhMSs5qEYZhVNi6SbhkEisXdTzaKza
```

### 原理
1. SHA-256(字串) → 32 bytes
2. 取 16 bytes（12 字）或全 32 bytes（24 字）作為 BIP39 entropy
3. `entropyToMnemonic` → 助記詞
4. `mnemonicToSeed` → 64 bytes seed
5. ed25519 衍生路徑 `m/44'/501'/0'/0'`（Phantom／Solflare 預設）
6. `Keypair.fromSeed` → Solana 公鑰

### 還原到 Phantom
複製助記詞 → Phantom「Import → Seed Phrase」→ 地址會對齊。

### 依賴
- `bip39`（Trezor 官方）
- `ed25519-hd-key`
- `@solana/web3.js`

---

## English

### Purpose
Turn any input string into a deterministic BIP39 mnemonic and Solana address. Same string always yields same mnemonic and same address. Equivalent to the [iancoleman.io/bip39](https://iancoleman.io/bip39/) "string → SHA-256 → Entropy → Mnemonic" flow, but **fully offline and single-file auditable**.

### Security Warning
- **The string IS the seed.** Anyone who guesses it owns all funds. Common words, birthdays, song lyrics are cracked in seconds.
- **Experimental / vanity / cold-derivation use only.** Do NOT store significant funds.
- For a real main wallet, use `solana-keygen new` to derive from system entropy. Don't use this tool.
- **Disconnect from network** before running.

### Install
```bash
git clone <this-repo>
cd str2mnemonic
npm install
```

### Usage
```bash
node str2mnemonic.mjs "your string"        # 24-word mnemonic (default)
node str2mnemonic.mjs "your string" 12      # 12-word mnemonic
```

### Example Output
```
input    : hello world
entropy  : b94d27b9934d3e08a52e52d7da7dabfa
mnemonic : rich hard unveil charge stadium affair net ski style stadium helmet void
pubkey   : EDo5PinXBHhsg7XhMSs5qEYZhVNi6SbhkEisXdTzaKza
```

### How it works
1. SHA-256(string) → 32 bytes
2. Take 16 bytes (12 words) or all 32 bytes (24 words) as BIP39 entropy
3. `entropyToMnemonic` → mnemonic
4. `mnemonicToSeed` → 64-byte seed
5. ed25519 derivation path `m/44'/501'/0'/0'` (Phantom / Solflare default)
6. `Keypair.fromSeed` → Solana public key

### Restore in Phantom
Copy mnemonic → Phantom "Import → Seed Phrase" → address matches.

### Dependencies
- `bip39` (Trezor official)
- `ed25519-hd-key`
- `@solana/web3.js`

---

## License
MIT
