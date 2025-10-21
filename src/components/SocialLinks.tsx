import { Twitter, ExternalLink } from 'lucide-react';

export const SocialLinks = () => {
  return (
    <div className="w-full bg-background/90 backdrop-blur-sm border-t border-primary/20 py-3 mt-auto">
      <div className="container flex justify-center items-center space-x-6">
        <a 
          href="https://twitter.com/PumpToken" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 hover:text-primary transition-colors"
        >
          <Twitter size={18} />
          <span>Twitter</span>
        </a>
        
        <a 
          href="https://www.coingecko.com/en/coins/pump-token" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 hover:text-primary transition-colors"
        >
          <ExternalLink size={18} />
          <span>CoinGecko</span>
        </a>
        
        <a 
          href="https://coinmarketcap.com/currencies/pump-token/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 hover:text-primary transition-colors"
        >
          <ExternalLink size={18} />
          <span>CoinMarketCap</span>
        </a>
      </div>
    </div>
  );
};