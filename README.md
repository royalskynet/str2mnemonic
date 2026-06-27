# str2mnemonic

字串 → BIP39 助記詞的離線確定性生成器。
Deterministic offline generator: string → BIP39 mnemonic.

---

## 中文

### 用途
輸入任意字串，產出對應的 BIP39 助記詞。同字串永遠對應同助記詞。等同 [iancoleman.io/bip39](https://iancoleman.io/bip39/) 「字串 → SHA-256 → Entropy → Mnemonic」流程，但**完全離線、單檔可審**。

產出的助記詞可直接匯入 Phantom／Solflare／Trust／Ledger 等支援 BIP39 的錢包，由錢包自行衍生各幣種地址。

### 安全警告
- **字串就是種子**：別人猜到字串就拿走全部資產。常見字、生日、歌詞秒爆。
- **只當實驗用或冷錢包派生**，**禁止**放主要資產。
- 真正主錢包請用錢包內建功能或 `solana-keygen new` 由系統熵產生，不要用本工具。
- 跑之前**拔網路線**。

### 安裝
```bash
git clone https://github.com/royalskynet/str2mnemonic.git
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
```

### 原理
1. SHA-256(字串) → 32 bytes
2. 取 16 bytes（12 字）或全 32 bytes（24 字）作為 BIP39 entropy
3. `entropyToMnemonic` → 助記詞

### 還原到錢包
複製助記詞 → 任何 BIP39 錢包「Import Seed Phrase」→ 地址自動衍生。

### 依賴
- `bip39`（Trezor 官方）

---

## English

### Purpose
Turn any input string into a deterministic BIP39 mnemonic. Same string always yields same mnemonic. Equivalent to the [iancoleman.io/bip39](https://iancoleman.io/bip39/) "string → SHA-256 → Entropy → Mnemonic" flow, but **fully offline and single-file auditable**.

The resulting mnemonic can be imported into any BIP39 wallet (Phantom / Solflare / Trust / Ledger / etc.), which then derives per-coin addresses on its own.

### Security Warning
- **The string IS the seed.** Anyone who guesses it owns all funds. Common words, birthdays, song lyrics are cracked in seconds.
- **Experimental / vanity / cold-derivation use only.** Do NOT store significant funds.
- For a real main wallet, use your wallet's built-in generator or `solana-keygen new` from system entropy. Don't use this tool.
- **Disconnect from network** before running.

### Install
```bash
git clone https://github.com/royalskynet/str2mnemonic.git
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
```

### How it works
1. SHA-256(string) → 32 bytes
2. Take 16 bytes (12 words) or all 32 bytes (24 words) as BIP39 entropy
3. `entropyToMnemonic` → mnemonic

### Restore in wallet
Copy mnemonic → any BIP39 wallet "Import Seed Phrase" → addresses derive automatically.

### Dependencies
- `bip39` (Trezor official)

---

## License
MIT
