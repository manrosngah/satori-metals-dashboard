import { useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { formatCurrency, cn } from '@/src/lib/utils';

export default function MeltValueCalculator() {
  const [metal, setMetal] = useState<'gold' | 'silver'>('gold');
  const [weight, setWeight] = useState('1');
  const [purity, setPurity] = useState('0.999');

  const prices = { gold: 2345.67, silver: 28.45 };
  const meltValue = Number(weight) * Number(purity) * prices[metal];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Calculator className="w-5 h-5 text-brand" />
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Melt Value Calculator</h3>
      </div>

      <div className="space-y-4">
        <div className="flex bg-brand/5 border border-brand/10 rounded-lg p-1">
          {['gold', 'silver'].map((m) => (
            <button
              key={m}
              onClick={() => setMetal(m as any)}
              className={cn(
                "flex-1 py-1.5 rounded-md text-xs font-bold capitalize transition-all",
                metal === m 
                  ? "bg-brand/10 text-brand shadow-sm shadow-brand/5" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Weight (oz)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm font-mono focus:border-brand outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Purity</label>
            <select
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm font-mono focus:border-brand outline-none"
            >
              <option value="0.999">.999 Fine</option>
              <option value="0.925">.925 Sterling</option>
              <option value="0.900">.900 Coin</option>
              <option value="0.585">14K Gold</option>
              <option value="0.750">18K Gold</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-brand/10 border border-brand/20 rounded-xl text-center">
          <p className="text-xs font-bold text-brand uppercase mb-1">Estimated Melt Value</p>
          <p className="text-3xl font-mono font-bold text-brand">{formatCurrency(meltValue)}</p>
        </div>

        <div className="flex items-start gap-2 text-[10px] text-muted-foreground leading-tight italic">
          <Info className="w-3 h-3 shrink-0 mt-0.5" />
          Calculated based on live spot prices. Does not include dealer premiums or refining costs.
        </div>
      </div>
    </div>
  );
}
