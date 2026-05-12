import { METALS } from '@/src/lib/mockData';
import { formatCurrency, cn } from '@/src/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function AssetList() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Market Overview</h3>
        <button className="text-xs font-bold text-brand hover:underline">View All</button>
      </div>
      <div className="divide-y divide-border">
        {METALS.map((metal) => (
          <div 
            key={metal.symbol} 
            className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center font-bold text-xs group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                {metal.symbol.slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-bold">{metal.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono uppercase">{metal.symbol} / USD</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-mono font-bold">{formatCurrency(metal.price)}</p>
              <div className={cn(
                "flex items-center justify-end gap-1 text-[10px] font-bold",
                metal.change >= 0 ? "text-up" : "text-down"
              )}>
                {metal.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(metal.changePercent)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
