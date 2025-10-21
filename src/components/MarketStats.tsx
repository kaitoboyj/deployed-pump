import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Mock price history data based on provided information
const priceHistoryData = [
  { date: 'Oct 10', price: 0.00401 },
  { date: 'Oct 11', price: 0.00376 },
  { date: 'Oct 12', price: 0.00434 },
  { date: 'Oct 13', price: 0.00433 },
  { date: 'Oct 14', price: 0.00410 },
  { date: 'Oct 15', price: 0.00383 },
  { date: 'Oct 16', price: 0.00347 },
  { date: 'Oct 17', price: 0.00352 },
  { date: 'Oct 18', price: 0.00396 },
  { date: 'Oct 19', price: 0.00392 },
  { date: 'Oct 20', price: 0.00386 },
];

export const MarketStats = () => {
  const stats = [
    { label: 'Market Cap', value: '$1.35B' },
    { label: 'Volume (24h)', value: '$285.81M' },
    { label: 'Fully Diluted Val.', value: '$3.83B' },
    { label: 'Circulating Supply', value: '354B PUMP' },
    { label: 'Total Supply', value: '1T PUMP' },
    { label: 'Holders', value: '104.83K' },
  ];

  return (
    <Card className="shadow-lg border-primary/20 bg-background/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>PUMP Market Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chart">Price Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-medium">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">All-time Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">All-time High</p>
                  <p className="font-medium">$0.01214</p>
                  <p className="text-xs text-red-500">-68.46%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">All-time Low</p>
                  <p className="font-medium">$0.001133</p>
                  <p className="text-xs text-green-500">+237.89%</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="chart">
            <div className="h-[200px] w-full mt-4">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceHistoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toFixed(5)}`}
                      dx={-10}
                    />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded p-2 shadow-md">
                              <p className="text-sm">{payload[0].payload.date}</p>
                              <p className="text-sm font-medium">
                                ${payload[0].value.toFixed(5)}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#4CAF50" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};