export interface MetalPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  category: 'Precious' | 'Base' | 'Energy' | 'Other';
  sparkline: number[];
}

export interface ChartDataPoint {
  time: string;
  price: number;
}

const generateSparkline = (base: number) => 
  Array.from({ length: 10 }, () => base + (Math.random() - 0.5) * (base * 0.02));

export const METALS: MetalPrice[] = [
  // Precious
  {
    symbol: 'XAU',
    name: 'Gold',
    price: 2345.67,
    change: 12.34,
    changePercent: 0.53,
    high: 2350.00,
    low: 2330.12,
    volume: '1.2M oz',
    category: 'Precious',
    sparkline: generateSparkline(2345),
  },
  {
    symbol: 'XAG',
    name: 'Silver',
    price: 28.45,
    change: -0.12,
    changePercent: -0.42,
    high: 28.70,
    low: 28.30,
    volume: '15.4M oz',
    category: 'Precious',
    sparkline: generateSparkline(28),
  },
  {
    symbol: 'XPT',
    name: 'Platinum',
    price: 980.20,
    change: 5.40,
    changePercent: 0.55,
    high: 985.00,
    low: 970.00,
    volume: '250K oz',
    category: 'Precious',
    sparkline: generateSparkline(980),
  },
  {
    symbol: 'XPD',
    name: 'Palladium',
    price: 1020.50,
    change: -15.30,
    changePercent: -1.48,
    high: 1040.00,
    low: 1015.00,
    volume: '180K oz',
    category: 'Precious',
    sparkline: generateSparkline(1020),
  },
  // Base
  {
    symbol: 'CU',
    name: 'Copper',
    price: 4.56,
    change: 0.08,
    changePercent: 1.79,
    high: 4.60,
    low: 4.45,
    volume: '45M lbs',
    category: 'Base',
    sparkline: generateSparkline(4.5),
  },
  {
    symbol: 'AL',
    name: 'Aluminum',
    price: 2540.00,
    change: 12.50,
    changePercent: 0.49,
    high: 2560.00,
    low: 2520.00,
    volume: '120K t',
    category: 'Base',
    sparkline: generateSparkline(2540),
  },
  {
    symbol: 'NI',
    name: 'Nickel',
    price: 17850.00,
    change: -210.00,
    changePercent: -1.16,
    high: 18100.00,
    low: 17700.00,
    volume: '15K t',
    category: 'Base',
    sparkline: generateSparkline(17850),
  },
  {
    symbol: 'ZN',
    name: 'Zinc',
    price: 2845.00,
    change: 5.00,
    changePercent: 0.18,
    high: 2860.00,
    low: 2830.00,
    volume: '40K t',
    category: 'Base',
    sparkline: generateSparkline(2845),
  },
];

export const generateMockChartData = (basePrice: number, points: number = 30): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentPrice = basePrice;
  const now = new Date();

  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const volatility = basePrice * 0.005;
    currentPrice += (Math.random() - 0.5) * volatility;
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Number(currentPrice.toFixed(2)),
    });
  }
  return data;
};

export const SHANGHAI_DATA = {
  silver: {
    shanghaiPrice: 31.45,
    globalPrice: 28.45,
    premium: 3.00,
    premiumPercent: 10.54,
    lastUpdate: '2 mins ago',
  },
  gold: {
    shanghaiPrice: 2415.67,
    globalPrice: 2345.67,
    premium: 70.00,
    premiumPercent: 2.98,
    lastUpdate: '2 mins ago',
  }
};

export const generatePremiumHistory = (basePremium: number, points: number = 30) => {
  const data = [];
  const now = new Date();
  let currentPremium = basePremium;
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    currentPremium += (Math.random() - 0.5) * (basePremium * 0.1);
    data.push({
      date: time.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      premium: Number(currentPremium.toFixed(2)),
    });
  }
  return data;
};

export const generateInventoryData = (points: number = 30) => {
  const data = [];
  const now = new Date();
  let currentInventory = 1200; // in tonnes
  let currentPrice = 31.45;
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    currentInventory -= (Math.random() - 0.45) * 20; // General downward trend
    currentPrice += (Math.random() - 0.5) * 0.5;
    data.push({
      date: time.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      inventory: Number(currentInventory.toFixed(0)),
      price: Number(currentPrice.toFixed(2)),
    });
  }
  return data;
};

export const MARKET_COMPARISON = [
  { feature: 'Primary Exchange', shanghai: 'SGE / SHFE', western: 'LBMA / COMEX' },
  { feature: 'Market Type', shanghai: 'Physical Delivery', western: 'Paper / Cash Settled' },
  { feature: 'VAT / Taxes', shanghai: '13% VAT Included', western: '0% (Wholesale)' },
  { feature: 'Import Quotas', shanghai: 'Strictly Regulated', western: 'Open Market' },
  { feature: 'Price Discovery', shanghai: 'Physical Demand Driven', western: 'Speculative / Institutional' },
];

export const HEATMAP_DATA = [
  { name: 'Gold', change: 0.53, category: 'Metals' },
  { name: 'Silver', change: -0.42, category: 'Metals' },
  { name: 'Platinum', change: 0.55, category: 'Metals' },
  { name: 'Palladium', change: -1.48, category: 'Metals' },
  { name: 'Copper', change: 1.79, category: 'Metals' },
  { name: 'Bitcoin', change: 2.45, category: 'Crypto' },
  { name: 'Ethereum', change: -1.20, category: 'Crypto' },
  { name: 'Solana', change: 5.67, category: 'Crypto' },
  { name: 'Crude Oil', change: -0.85, category: 'Energy' },
  { name: 'Natural Gas', change: 3.12, category: 'Energy' },
  { name: 'S&P 500', change: 0.15, category: 'Indices' },
  { name: 'NASDAQ', change: -0.34, category: 'Indices' },
];

export const MELT_VALUE_DATA = {
  gold: { purity: 0.999, weight: 31.1035, price: 2345.67 },
  silver: { purity: 0.999, weight: 31.1035, price: 28.45 },
};

export const NEWS = [
  {
    id: 1,
    title: 'Gold Prices Surge as Central Banks Increase Reserves',
    source: 'Market Watch',
    time: '2h ago',
    category: 'Analysis',
  },
  {
    id: 2,
    title: 'Silver Market Outlook: Industrial Demand Reaches Record Highs',
    source: 'Metal News',
    time: '4h ago',
    category: 'Market',
  },
  {
    id: 3,
    title: 'Platinum Supply Constraints Expected to Persist Through 2026',
    source: 'Mining Weekly',
    time: '6h ago',
    category: 'Supply',
  },
];

