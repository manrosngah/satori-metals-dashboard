import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { cn } from './lib/utils';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PriceTicker from './components/PriceTicker';
import TradingChart from './components/TradingChart';
import OrderPanel from './components/OrderPanel';
import AssetList from './components/AssetList';
import MarketNews from './components/MarketNews';
import PerformanceHeatMap from './components/PerformanceHeatMap';
import MeltValueCalculator from './components/MeltValueCalculator';
import EconomicCalendarWidget from './components/EconomicCalendarWidget';
import MetalsPage from './pages/MetalsPage';
import ShanghaiPremiumPage from './pages/ShanghaiPremiumPage';
import EconomicCalendarPage from './pages/EconomicCalendarPage';
import { motion } from 'motion/react';
import { Shield, Globe, Zap, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Chart & News */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TradingChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PerformanceHeatMap />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MarketNews />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-full"
            >
              <EconomicCalendarWidget />
            </motion.div>
          </div>
        </div>

        {/* Right Column - Trading & Assets */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <OrderPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <MeltValueCalculator />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <AssetList />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-brand rounded-2xl p-6 text-brand-foreground relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-sm font-medium opacity-80 mb-4">Get institutional-grade tools, lower fees, and priority support.</p>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black/80 transition-colors">
                Learn More
              </button>
            </div>
            <Shield className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
          </motion.div>
        </div>
      </div>

      {/* Quick Compare Section */}
      <section className="bg-card border border-border rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold">Quick Compare</h2>
            <p className="text-muted-foreground leading-relaxed">
              Instantly compare precious metals, cryptocurrencies, and global indices to identify market trends and arbitrage opportunities.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-xs font-bold uppercase tracking-wider">Real-time Data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-xs font-bold uppercase tracking-wider">Cross-Asset</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {[
              { pair: 'Gold / Silver', ratio: '82.45', change: '+0.12%' },
              { pair: 'BTC / Gold', ratio: '28.12', change: '-1.45%' },
              { pair: 'S&P / Gold', ratio: '2.15', change: '+0.34%' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-muted/50 border border-border rounded-xl hover:border-brand/50 transition-colors group">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{item.pair}</p>
                <div className="flex items-end justify-between">
                  <p className="text-xl font-mono font-bold">{item.ratio}</p>
                  <p className={cn(
                    "text-xs font-bold",
                    item.change.startsWith('+') ? "text-up" : "text-down"
                  )}>
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="bg-brand text-brand-foreground px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-brand/20 transition-all flex items-center gap-2 shrink-0">
            Full Comparison
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col h-screen overflow-hidden">
        <PriceTicker />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/metals" element={<MetalsPage />} />
                <Route path="/shanghai" element={<ShanghaiPremiumPage />} />
                <Route path="/calendar" element={<EconomicCalendarPage />} />
              </Routes>
            </div>

            {/* Features Section */}
            <section className="bg-muted/30 border-t border-border py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    { icon: Globe, title: 'Global Access', desc: 'Trade precious metals from anywhere in the world with 24/7 market access.' },
                    { icon: Zap, title: 'Lightning Fast', desc: 'Our high-frequency trading engine ensures your orders are executed in milliseconds.' },
                    { icon: Shield, title: 'Vault Security', desc: 'Your assets are protected by multi-sig cold storage and institutional-grade encryption.' },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center">
                        <f.icon className="w-8 h-8 text-brand" />
                      </div>
                      <h3 className="text-lg font-bold">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer className="bg-background border-t border-border py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-md">
                          <polygon points="14,2 24,2 12,14 2,14" fill="currentColor" className="text-brand" />
                          <polygon points="22,10 12,10 0,22 10,22" fill="currentColor" className="text-brand opacity-80" />
                        </svg>
                      </div>
                      <span className="font-logo text-lg font-bold tracking-tight">
                        Satori<span className="text-brand">Metals</span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                      The world's most advanced precious metals trading platform. Secure, fast, and transparent.
                    </p>
                  </div>
                  
                  {[
                    { title: 'Platform', links: ['Markets', 'Trading', 'Fees', 'Security'] },
                    { title: 'Company', links: ['About', 'Careers', 'Press', 'Legal'] },
                    { title: 'Resources', links: ['API Docs', 'Guides', 'Support', 'Status'] },
                    { title: 'Social', links: ['Twitter', 'LinkedIn', 'Discord', 'Telegram'] },
                  ].map((col) => (
                    <div key={col.title}>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{col.title}</h4>
                      <ul className="space-y-2">
                        {col.links.map((link) => (
                          <li key={link}>
                            <a href="#" className="text-sm text-muted-foreground hover:text-brand transition-colors">{link}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-muted-foreground">
                    © 2026 Satori Metals Group. All rights reserved.
                  </p>
                  <div className="flex gap-6">
                    <a href="#" className="text-xs text-muted-foreground hover:text-brand">Privacy Policy</a>
                    <a href="#" className="text-xs text-muted-foreground hover:text-brand">Terms of Service</a>
                    <a href="#" className="text-xs text-muted-foreground hover:text-brand">Cookie Policy</a>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
    </Router>
  );
}
