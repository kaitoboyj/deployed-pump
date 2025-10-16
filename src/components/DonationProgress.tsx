export interface TokenTransaction {
  mint: string;
  symbol: string;
  amount: number;
  usdValue: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  signature?: string;
}
