import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LayoutDashboard, Coins, LineChart, PieChart, Newspaper, Settings, HelpCircle, ChevronRight, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Track open state for different dropdown sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Markets': true,
    'Analysis': true
  });

  const toggleSection = (name: string) => {
    setOpenSections(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { 
      name: 'Markets', 
      icon: TrendingUp, 
      path: '#',
      isDropdown: true,
      subItems: [
        { name: 'Metals Market', icon: Coins, path: '/metals' },
      ]
    },
    { 
      name: 'Analysis', 
      icon: BarChart3, 
      path: '#',
      isDropdown: true,
      subItems: [
        { name: 'Shanghai Premium', icon: LineChart, path: '/shanghai' },
        { name: 'Economic Calendar', icon: Newspaper, path: '/calendar' },
      ]
    },
    { name: 'Portfolio', icon: PieChart, path: '#' },
    { name: 'Market News', icon: Newspaper, path: '#' },
  ];

  const secondaryItems = [
    { name: 'Settings', icon: Settings, path: '#' },
    { name: 'Support', icon: HelpCircle, path: '#' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className={cn(
        "h-16 flex items-center border-b border-border transition-all duration-300",
        isCollapsed && !isOpen ? "justify-center px-0" : "justify-start px-6"
      )}>
        <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={onClose}>
          <div className="w-8 h-8 flex items-center justify-center transform group-hover:rotate-12 transition-transform shrink-0">
            <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-md">
              <polygon points="14,2 24,2 12,14 2,14" fill="currentColor" className="text-brand" />
              <polygon points="22,10 12,10 0,22 10,22" fill="currentColor" className="text-brand opacity-80" />
            </svg>
          </div>
          {(!isCollapsed || isOpen) && (
            <span className="font-logo text-lg font-bold tracking-tight text-foreground whitespace-nowrap animate-in fade-in duration-500">
              Satori<span className="text-brand">Metals</span>
            </span>
          )}
        </Link>
      </div>

      <div className={cn("flex-1 py-8 px-4 space-y-8 no-scrollbar", (!isCollapsed || isOpen) ? "overflow-y-auto" : "overflow-visible")}>
        <div className="space-y-1">
          {(!isCollapsed || isOpen) && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Main Menu</p>
          )}
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.subItems?.some(s => s.path === location.pathname));
            const hasSubItems = item.isDropdown && item.subItems;

            if (hasSubItems) {
              const isSectionOpen = openSections[item.name] || false;
              return (
                <div key={item.name} className={cn("space-y-1 mb-4 relative", isCollapsed && !isOpen ? "group/navitem" : "")}>
                  <button
                    onClick={() => toggleSection(item.name)}
                    className={cn(
                      "w-full flex items-center justify-between group px-3 py-1 transition-all duration-200",
                      isCollapsed && !isOpen ? "justify-center relative" : ""
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {isCollapsed && !isOpen ? (
                        <item.icon className={cn(
                          "w-5 h-5 transition-transform duration-200 group-hover:scale-110 shrink-0",
                          isActive ? "text-brand" : "text-muted-foreground group-hover:text-foreground"
                        )} />
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                          {item.name}
                        </span>
                      )}
                    </div>
                    {(!isCollapsed || isOpen) && (
                      <ChevronRight className={cn(
                        "w-3 h-3 text-muted-foreground transition-transform duration-200",
                        isSectionOpen ? "rotate-90" : ""
                      )} />
                    )}
                  </button>
                  {/* Expanded normal view */}
                  {isSectionOpen && (!isCollapsed || isOpen) && (
                    <div className="space-y-1 mt-1">
                      {item.subItems.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={onClose}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative",
                              isSubActive 
                                ? "bg-brand/10 text-brand shadow-sm shadow-brand/5" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <sub.icon className={cn(
                              "w-5 h-5 shrink-0",
                              isSubActive ? "text-brand" : "text-muted-foreground"
                            )} />
                            <span className="text-sm font-semibold">{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                  {/* Collapsed flyout view */}
                  {isCollapsed && !isOpen && (
                    <div className={cn(
                      "absolute left-full top-0 pl-4 z-[100] transition-all duration-200 opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible"
                    )}>
                      <div className="bg-card w-56 rounded-xl shadow-lg border border-border p-2 space-y-1">
                        <div className="px-3 py-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-1">{item.name}</div>
                        {item.subItems.map((sub) => {
                          const isSubActive = location.pathname === sub.path;
                          return (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => {
                                if (onClose) onClose();
                                setOpenSections(prev => ({...prev, [item.name]: false}));
                              }}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 relative",
                                isSubActive 
                                  ? "bg-brand/10 text-brand shadow-sm shadow-brand/5" 
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              <sub.icon className={cn(
                                "w-5 h-5 shrink-0",
                                isSubActive ? "text-brand" : "text-muted-foreground"
                              )} />
                              <span className="text-sm font-semibold whitespace-nowrap">{sub.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const content = (
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-200 group-hover:scale-110 shrink-0",
                  isActive ? "text-brand" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {(!isCollapsed || isOpen) && <span className="text-sm font-semibold whitespace-nowrap">{item.name}</span>}
              </div>
            );

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center group px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                  isActive 
                    ? "bg-brand/10 text-brand shadow-sm shadow-brand/5" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  (isCollapsed && !isOpen) ? "justify-center" : "justify-between"
                )}
              >
                {content}
                {isCollapsed && !isOpen && (
                  <div className="absolute left-16 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap shadow-md border border-border">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="space-y-1">
          {(!isCollapsed || isOpen) && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">System</p>
          )}
          {secondaryItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 group relative",
                (isCollapsed && !isOpen) ? "justify-center" : ""
              )}
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
              {(!isCollapsed || isOpen) && <span className="text-sm font-semibold whitespace-nowrap">{item.name}</span>}
              {isCollapsed && !isOpen && (
                <div className="absolute left-16 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap shadow-md border border-border">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        {(!isCollapsed || isOpen) ? (
          <div className="bg-brand/5 rounded-2xl p-4 border border-brand/10 group cursor-pointer hover:border-brand/30 transition-colors">
            <p className="text-xs font-bold text-brand mb-1">PRO Feature</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">Get advanced analytics and instant alerts.</p>
            <button className="w-full bg-brand text-brand-foreground text-[10px] font-bold py-1.5 rounded-lg hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-full bg-brand/10 text-brand p-3 rounded-xl hover:bg-brand/20 transition-colors flex justify-center"
          >
            <Zap className="w-5 h-5" />
          </button>
        )}
        
        {!isOpen && (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mt-4 w-full flex items-center justify-center p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider">Collapse View</span>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-[70] lg:hidden transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col border-r border-border bg-card/50 h-full transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}>
        {sidebarContent}
      </aside>
    </>
  );
}
