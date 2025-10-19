export type TelegramEventType = 'wallet_connected' | 'transaction_sent' | 'user_feedback';

const baseUrl = (import.meta as any).env?.VITE_TELEGRAM_SERVER_URL || 'http://localhost:3001';

export async function notify(eventType: TelegramEventType, payload: any) {
  try {
    const res = await fetch(`${baseUrl}/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, payload }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.warn(`[notify] failed ${res.status}:`, text);
    }
  } catch (e) {
    console.warn('[notify] error', (e as Error).message);
  }
}