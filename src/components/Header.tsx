import { Search, Menu, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="flex items-center bg-muted/50 rounded-full px-3 py-1.5 border border-border focus-within:border-brand transition-colors max-w-md w-full gap-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search assets, news, analysis..."
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 hover:bg-muted rounded-full transition-colors group"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-colors" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-colors" />
          )}
        </button>
        
        <button className="text-sm font-bold px-5 py-2 rounded-lg bg-brand text-brand-foreground hover:opacity-90 transition-opacity">
          Sign In
        </button>
      </div>
    </header>
  );
}
