import { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface CustomWalletButtonProps {
  className?: string;
}

export const CustomWalletButton: FC<CustomWalletButtonProps> = ({ className }) => {
  return (
    <WalletMultiButton className={`!bg-gradient-to-r !from-primary !to-accent !text-primary-foreground !font-bold !shadow-lg !hover:shadow-xl !transition-all !duration-300 ${className}`}>
      connect wallet
    </WalletMultiButton>
  );
};