import { NEWS } from '@/src/lib/mockData';
import { Clock, ExternalLink } from 'lucide-react';

export default function MarketNews() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Market News</h3>
        <button className="text-xs font-bold text-brand hover:underline">Latest</button>
      </div>
      <div className="divide-y divide-border">
        {NEWS.map((item) => (
          <div key={item.id} className="p-4 hover:bg-muted/30 cursor-pointer transition-colors group">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-brand/10 text-brand text-[10px] font-bold rounded uppercase">
                {item.category}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
            <h4 className="text-sm font-bold leading-snug group-hover:text-brand transition-colors">
              {item.title}
            </h4>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] text-muted-foreground font-medium">{item.source}</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-brand transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
