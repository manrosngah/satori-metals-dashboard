import { useState } from 'react';
import { METALS, MetalPrice } from '@/src/lib/mockData';
import { formatCurrency, cn } from '@/src/lib/utils';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Sparkline = ({ data, color }: { data: number[], color: string }) => {
  const chartData = data.map((val, i) => ({ val, i }));
  return (
    <div className="h-12 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line 
            type="monotone" 
            dataKey="val" 
            stroke={color} 
            strokeWidth={2} 
            dot={false} 
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function MetalsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Precious' | 'Base'>('All');

  const filteredMetals = METALS.filter(m => 
    activeCategory === 'All' || m.category === activeCategory
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Metal Prices <span className="text-brand">Today</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Track real-time prices for precious and base metals. Our data is updated every minute from global exchanges to ensure you have the most accurate market information.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 p-1 bg-brand/5 border border-brand/10 rounded-xl w-fit">
        {['All', 'Precious', 'Base'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-bold transition-all",
              activeCategory === cat 
                ? "bg-brand/10 text-brand shadow-sm shadow-brand/5" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {cat} Metals
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Metal</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Price (USD)</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">24h Change</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">7d Trend</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMetals.map((metal, idx) => (
                <motion.tr 
                  key={metal.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-muted/20 transition-colors group"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center font-bold text-xs group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                        {metal.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{metal.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase">{metal.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-mono font-bold text-lg">
                    {formatCurrency(metal.price)}
                  </td>
                  <td className="px-6 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold",
                      metal.change >= 0 ? "bg-up/10 text-up" : "bg-down/10 text-down"
                    )}>
                      {metal.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(metal.changePercent)}%
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <Sparkline 
                      data={metal.sparkline} 
                      color={metal.change >= 0 ? "#22C55E" : "#EF4444"} 
                    />
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="bg-muted hover:bg-brand hover:text-brand-foreground px-4 py-2 rounded-lg text-xs font-bold transition-all">
                      Trade
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center">
            <Info className="text-brand w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Where do these prices come from?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Satori Metals aggregates data from over 50 global exchanges and liquidity providers. Our proprietary algorithm filters out noise and ensures you see the most accurate mid-market price available.
          </p>
          <button className="text-sm font-bold text-brand hover:underline">Learn about our data methodology →</button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 bg-up/10 rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-up w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Institutional Grade Security</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All price feeds are cryptographically signed and verified. We use advanced anti-tamper technology to ensure the integrity of every data point displayed on our platform.
          </p>
          <button className="text-sm font-bold text-up hover:underline">View security audit reports →</button>
        </div>
      </section>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
