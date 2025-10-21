import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface CustomWalletButtonProps {
  className?: string;
}

export const CustomWalletButton: FC<CustomWalletButtonProps> = ({ className }) => {
  const { connected, publicKey } = useWallet();
  
  // Format wallet address to show first 4 and last 4 characters
  const formattedAddress = publicKey ? 
    `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : 
    'Connect Wallet';

  return (
    <WalletMultiButton className={`!bg-gradient-to-r !from-primary !to-accent !text-primary-foreground !font-bold !shadow-lg !hover:shadow-xl !transition-all !duration-300 ${className}`}>
      {connected ? formattedAddress : "connect wallet"}
    </WalletMultiButton>
  );
};