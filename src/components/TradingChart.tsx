import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { generateMockChartData, METALS } from '@/src/lib/mockData';
import { formatCurrency, cn } from '@/src/lib/utils';

export default function TradingChart() {
  const [selectedMetal, setSelectedMetal] = useState(METALS[0]);
  const [timeframe, setTimeframe] = useState('1H');
  
  const data = useMemo(() => generateMockChartData(selectedMetal.price, 24), [selectedMetal]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center">
            <span className="text-brand font-bold">{selectedMetal.symbol.slice(0, 2)}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{selectedMetal.name} / USD</h2>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-bold">{formatCurrency(selectedMetal.price)}</span>
              <span className={cn(
                "text-sm font-bold",
                selectedMetal.change >= 0 ? "text-up" : "text-down"
              )}>
                {selectedMetal.change >= 0 ? '+' : ''}{selectedMetal.changePercent}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex bg-brand/5 border border-brand/10 rounded-lg p-1">
          {['1H', '4H', '1D', '1W', '1M', 'ALL'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                timeframe === tf 
                  ? "bg-brand/10 text-brand shadow-sm shadow-brand/5" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FACB3F" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FACB3F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="currentColor" 
              opacity={0.5}
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="currentColor" 
              opacity={0.5}
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0A0A0A', 
                border: '1px solid #27272A',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#FACB3F' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#FACB3F" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        {[
          { label: '24h High', value: formatCurrency(selectedMetal.high) },
          { label: '24h Low', value: formatCurrency(selectedMetal.low) },
          { label: '24h Volume', value: selectedMetal.volume },
          { label: 'Market Cap', value: '$2.4T' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{stat.label}</p>
            <p className="text-sm font-mono font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
