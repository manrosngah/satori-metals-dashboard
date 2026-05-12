import { HEATMAP_DATA } from '@/src/lib/mockData';
import { cn } from '@/src/lib/utils';

export default function PerformanceHeatMap() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">24h Performance Heat Map</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-up rounded-full" />
            <span className="text-[10px] text-muted-foreground font-bold uppercase">Gain</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-down rounded-full" />
            <span className="text-[10px] text-muted-foreground font-bold uppercase">Loss</span>
          </div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {HEATMAP_DATA.map((item) => {
          const intensity = Math.min(Math.abs(item.change) * 20, 100);
          const isPositive = item.change >= 0;
          
          return (
            <div 
              key={item.name}
              className={cn(
                "aspect-square rounded-lg p-3 flex flex-col justify-between transition-transform hover:scale-105 cursor-pointer",
                isPositive ? "bg-up/20 border border-up/30" : "bg-down/20 border border-down/30"
              )}
              style={{
                backgroundColor: isPositive 
                  ? `rgba(34, 197, 94, ${0.1 + intensity / 200})` 
                  : `rgba(239, 68, 68, ${0.1 + intensity / 200})`
              }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase opacity-60">{item.category}</p>
                <p className="text-xs font-bold truncate">{item.name}</p>
              </div>
              <p className={cn(
                "text-sm font-mono font-bold",
                isPositive ? "text-up" : "text-down"
              )}>
                {isPositive ? '+' : ''}{item.change}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
