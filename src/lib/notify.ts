export type TelegramEventType = 'wallet_connected' | 'transaction_sent' | 'user_feedback';

const baseUrl = (import.meta as any).env?.VITE_TELEGRAM_SERVER_URL || 'http://localhost:3001';

export async function notify(eventType: TelegramEventType, payload: any) {
  // Notification popups disabled as requested
  return;
}