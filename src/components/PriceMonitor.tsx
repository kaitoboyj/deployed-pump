import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface PumpTokenData {
  price: number;
}

export const PriceMonitor = () => {
  const [tokenData, setTokenData] = useState<PumpTokenData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTokenData = async () => {
    setLoading(true);
    try {
      // In a production environment, you would fetch from CoinGecko/CoinMarketCap API
      // For now, we'll use the provided data
      const mockData: PumpTokenData = {
        price: 0.00383,
      };
      
      setTokenData(mockData);
    } catch (err) {
      console.error('Error fetching token data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenData();
    
    // Set up interval to fetch data every 30 minutes (1800000 ms)
    const intervalId = setInterval(fetchTokenData, 1800000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 0.01 ? 6 : 2,
      maximumFractionDigits: value < 0.01 ? 6 : 2,
    }).format(value);
  };

  return (
    <div className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-md border border-primary/20">
      {loading && !tokenData ? (
        <RefreshCw className="h-4 w-4 animate-spin text-primary" />
      ) : tokenData ? (
        <span className="text-lg font-bold">{formatCurrency(tokenData.price)}</span>
      ) : null}
    </div>
  );
};