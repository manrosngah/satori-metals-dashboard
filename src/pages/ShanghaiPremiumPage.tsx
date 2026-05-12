import { useState, useMemo } from 'react';
import { SHANGHAI_DATA, generatePremiumHistory, generateInventoryData, MARKET_COMPARISON } from '@/src/lib/mockData';
import { formatCurrency, cn } from '@/src/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Info, 
  Globe, 
  BarChart3,
  Scale,
  Clock,
  Database,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line
} from 'recharts';

export default function ShanghaiPremiumPage() {
  const [selectedAsset, setSelectedAsset] = useState<'silver' | 'gold'>('silver');
  const data = SHANGHAI_DATA[selectedAsset];
  
  const premiumData = useMemo(() => generatePremiumHistory(data.premium, 30), [selectedAsset, data.premium]);
  const inventoryData = useMemo(() => generateInventoryData(30), []);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider">
          Market Arbitrage
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Shanghai <span className="text-brand">Premium</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Track the price difference between the Shanghai Gold Exchange (SGE) and global spot prices. China's massive demand often creates a significant premium over Western markets.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 p-1 bg-brand/5 border border-brand/10 rounded-xl w-fit">
        {(['silver', 'gold'] as const).map((asset) => (
          <button
            key={asset}
            onClick={() => setSelectedAsset(asset)}
            className={cn(
              "px-8 py-2.5 rounded-lg text-sm font-bold transition-all capitalize",
              selectedAsset === asset 
                ? "bg-brand/10 text-brand shadow-sm shadow-brand/5" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {asset}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Price Comparison Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Price Comparison</h3>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {data.lastUpdate}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Shanghai (SGE)</p>
                <p className="text-2xl font-mono font-bold text-brand">{formatCurrency(data.shanghaiPrice)}</p>
              </div>

              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                  <Scale className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Global Spot</p>
                <p className="text-2xl font-mono font-bold">{formatCurrency(data.globalPrice)}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Current Premium</p>
                  <p className="text-3xl font-mono font-bold text-up">+{formatCurrency(data.premium)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-up">{data.premiumPercent}%</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Over Spot</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand rounded-2xl p-6 text-brand-foreground">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Arbitrage Alert
            </h4>
            <p className="text-sm font-medium opacity-90 leading-relaxed">
              The Shanghai premium is currently at a {data.premiumPercent > 5 ? 'high' : 'moderate'} level. This suggests strong physical demand in the Chinese market relative to Western paper markets.
            </p>
          </div>
        </div>

        {/* Premium History Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Premium History (30D)</h3>
              <p className="text-xs text-muted-foreground mt-1">Shanghai vs Global Spot Spread in USD</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={premiumData}>
                <defs>
                  <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} vertical={false} />
                <XAxis 
                  dataKey="date" 
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
                  itemStyle={{ color: '#22C55E' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="premium" 
                  stroke="#22C55E" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPremium)" 
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Shanghai Silver Futures Price vs SHFE Inventory */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Database className="w-6 h-6 text-brand" />
              Shanghai Silver Futures Price vs SHFE Inventory
            </h2>
            <p className="text-sm text-muted-foreground">Correlation between physical exchange inventory and futures pricing.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brand rounded-sm" />
              <span className="text-muted-foreground uppercase">Price (USD)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted-foreground/30 rounded-sm" />
              <span className="text-muted-foreground uppercase">Inventory (Tonnes)</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="currentColor" 
                opacity={0.5}
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                minTickGap={30}
              />
              <YAxis 
                yAxisId="left"
                stroke="currentColor" 
                opacity={0.5}
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
                domain={['auto', 'auto']}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="currentColor" 
                opacity={0.5}
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `${val}t`}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0A0A0A', 
                  border: '1px solid #27272A',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                yAxisId="right"
                dataKey="inventory" 
                fill="#27272A" 
                radius={[4, 4, 0, 0]}
                opacity={0.5}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="price" 
                stroke="#FACB3F" 
                strokeWidth={3}
                dot={false}
                animationDuration={1500}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* NEW SECTION: Market Comparison Table */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Layers className="w-6 h-6 text-brand" />
            Shanghai vs Western Silver Markets
          </h2>
          <p className="text-sm text-muted-foreground">Key differences in market structure, taxation, and price formation.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Feature</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand">Shanghai (SGE/SHFE)</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Western (LBMA/COMEX)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MARKET_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-muted-foreground">{row.feature}</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">{row.shanghai}</td>
                  <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{row.western}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Globe,
            title: 'What is the Shanghai Premium?',
            desc: 'The difference between the price of metals on the Shanghai Gold Exchange (SGE) and the London/New York spot price.'
          },
          {
            icon: Scale,
            title: 'Why does it exist?',
            desc: 'China has strict capital controls and import quotas, which can lead to supply shortages and higher local prices during periods of high demand.'
          },
          {
            icon: ArrowRight,
            title: 'Market Impact',
            desc: 'A high Shanghai premium often precedes a rise in global spot prices as it signals strong physical buying in the world\'s largest consumer market.'
          }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <item.icon className="w-5 h-5 text-brand" />
            </div>
            <h4 className="font-bold">{item.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      <div className="bg-muted/30 border border-border rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold">Deep Dive: Shanghai Silver vs COMEX</h3>
            <p className="text-muted-foreground leading-relaxed">
              Shanghai silver often trades at a significant premium to COMEX. This is due to China's 13% VAT on silver imports and the fact that Shanghai is a physical delivery exchange, whereas COMEX is primarily a paper market.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-xs font-bold uppercase tracking-wider">Physical Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-xs font-bold uppercase tracking-wider">Import Quotas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-xs font-bold uppercase tracking-wider">VAT Impact</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 aspect-square bg-card border border-border rounded-2xl flex items-center justify-center p-8">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 border-4 border-brand/20 rounded-full animate-pulse" />
              <div className="absolute inset-4 border-4 border-brand/40 rounded-full" />
              <div className="absolute inset-8 border-4 border-brand rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-brand">SGE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
