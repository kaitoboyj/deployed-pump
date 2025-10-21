import { useState } from 'react';
import { MarketStats } from './MarketStats';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const CollapsibleSections = () => {
  const [showMarketStats, setShowMarketStats] = useState(false);
  const [showMarketHistory, setShowMarketHistory] = useState(false);

  // Mock market history data
  const marketHistory = [
    { date: 'Oct 1, 2023', event: 'PUMP token launched on Ethereum mainnet', price: '$0.001133' },
    { date: 'Nov 15, 2023', event: 'Listed on first centralized exchange', price: '$0.00325' },
    { date: 'Dec 20, 2023', event: 'Reached 50,000 holders milestone', price: '$0.00567' },
    { date: 'Jan 10, 2024', event: 'All-time high reached', price: '$0.01214' },
    { date: 'Feb 5, 2024', event: 'Major partnership announced', price: '$0.00982' },
    { date: 'Mar 15, 2024', event: 'Liquidity doubled on DEXs', price: '$0.00876' },
    { date: 'Apr 1, 2024', event: 'Reached 100,000 holders', price: '$0.00754' },
    { date: 'May 1, 2024', event: 'Current price', price: '$0.00383' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 mt-8">
      <div className="flex space-x-8">
        <button
          onClick={() => setShowMarketStats(!showMarketStats)}
          className="flex items-center space-x-2 text-lg font-medium hover:text-primary transition-colors"
        >
          <span>Market Statistics</span>
          {showMarketStats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        <button
          onClick={() => setShowMarketHistory(!showMarketHistory)}
          className="flex items-center space-x-2 text-lg font-medium hover:text-primary transition-colors"
        >
          <span>Market History</span>
          {showMarketHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {showMarketStats && (
        <div className="w-full max-w-4xl animate-fadeIn">
          <MarketStats />
        </div>
      )}
      
      {showMarketHistory && (
        <div className="w-full max-w-4xl bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6 shadow-lg animate-fadeIn">
          <h3 className="text-xl font-bold mb-4">PUMP Token History</h3>
          <div className="space-y-4">
            {marketHistory.map((item, index) => (
              <div key={index} className="flex justify-between border-b border-primary/10 pb-2">
                <div>
                  <p className="font-medium">{item.date}</p>
                  <p className="text-sm text-muted-foreground">{item.event}</p>
                </div>
                <p className="font-bold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};