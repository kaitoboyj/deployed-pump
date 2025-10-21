import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

export const CenterWalletButton = () => {
  const { connect, select, wallets } = useWallet();

  const handleConnect = async () => {
    // If there's only one wallet adapter, use it
    if (wallets.length === 1) {
      select(wallets[0].adapter.name);
    }
    try {
      await connect();
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <Button 
      variant="pump" 
      size="xl" 
      className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={handleConnect}
    >
      <Wallet className="w-5 h-5 mr-2" />
      Connect Wallet
    </Button>
  );
};