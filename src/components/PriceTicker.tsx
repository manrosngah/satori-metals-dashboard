import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { METALS } from '@/src/lib/mockData';
import { formatCurrency, cn } from '@/src/lib/utils';

export default function PriceTicker() {
  return (
    <div className="w-full bg-muted/50 border-b border-border overflow-hidden py-2">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...METALS, ...METALS].map((metal, idx) => (
          <div key={`${metal.symbol}-${idx}`} className="flex items-center gap-3 px-4">
            <span className="text-xs font-bold text-muted-foreground">{metal.symbol}</span>
            <span className="text-sm font-mono font-medium">{formatCurrency(metal.price)}</span>
            <div className={cn(
              "flex items-center text-xs font-bold",
              metal.change >= 0 ? "text-up" : "text-down"
            )}>
              {metal.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(metal.changePercent)}%
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
