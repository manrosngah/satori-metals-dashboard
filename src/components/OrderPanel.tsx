import { useState } from 'react';
import { ArrowRightLeft, ShieldCheck, Zap } from 'lucide-react';
import { cn, formatCurrency } from '@/src/lib/utils';

export default function OrderPanel() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex bg-muted rounded-xl p-1">
        <button
          onClick={() => setSide('buy')}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all",
            side === 'buy' ? "bg-up text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setSide('sell')}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all",
            side === 'sell' ? "bg-down text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Sell
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-muted-foreground uppercase">Amount</span>
            <span className="text-brand">Balance: 12.45 XAU</span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-lg font-mono focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
              XAU
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['25%', '50%', '75%', 'MAX'].map((p) => (
            <button key={p} className="py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-[10px] font-bold text-muted-foreground border border-border transition-colors">
              {p}
            </button>
          ))}
        </div>

        <div className="space-y-3 py-4 border-y border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span className="font-mono font-bold">$2,345.67</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transaction Fee</span>
            <span className="font-mono font-bold">$1.20</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-mono font-bold text-brand">{formatCurrency(Number(amount) * 2345.67 || 0)}</span>
          </div>
        </div>

        <button className={cn(
          "w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all active:scale-[0.98]",
          side === 'buy' ? "bg-brand text-brand-foreground hover:opacity-90" : "bg-down text-white hover:opacity-90"
        )}>
          {side === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50">
          <Zap className="w-5 h-5 text-brand" />
          <div>
            <p className="text-xs font-bold">Instant Execution</p>
            <p className="text-[10px] text-muted-foreground">Your order will be filled immediately at market price.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50">
          <ShieldCheck className="w-5 h-5 text-up" />
          <div>
            <p className="text-xs font-bold">Secure Transaction</p>
            <p className="text-[10px] text-muted-foreground">All trades are protected by Satori Vault™ security.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
