import React from 'react';
import { Calendar as CalendarIcon, Filter, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data for the economic calendar
const events = [
  { id: 1, date: 'Today, Apr 19', time: '08:30 AM', country: 'US', currency: 'USD', event: 'Core CPI m/m', impact: 'High', actual: '0.3%', forecast: '0.3%', previous: '0.4%' },
  { id: 2, date: 'Today, Apr 19', time: '10:00 AM', country: 'US', currency: 'USD', event: 'ISM Manufacturing PMI', impact: 'High', actual: '-', forecast: '49.5', previous: '49.2' },
  { id: 3, date: 'Tomorrow, Apr 20', time: '02:00 PM', country: 'US', currency: 'USD', event: 'FOMC Statement', impact: 'High', actual: '-', forecast: '-', previous: '-' },
  { id: 4, date: 'Tomorrow, Apr 20', time: '02:30 PM', country: 'US', currency: 'USD', event: 'Fed Press Conference', impact: 'High', actual: '-', forecast: '-', previous: '-' },
  { id: 5, date: 'Thu, Apr 21', time: '04:00 AM', country: 'EU', currency: 'EUR', event: 'ECB President Lagarde Speaks', impact: 'Medium', actual: '-', forecast: '-', previous: '-' },
  { id: 6, date: 'Thu, Apr 21', time: '08:30 AM', country: 'US', currency: 'USD', event: 'Unemployment Claims', impact: 'High', actual: '-', forecast: '215K', previous: '211K' },
  { id: 7, date: 'Fri, Apr 22', time: '09:45 AM', country: 'US', currency: 'USD', event: 'Flash Manufacturing PMI', impact: 'Medium', actual: '-', forecast: '52.0', previous: '51.9' },
];

export default function EconomicCalendarPage() {
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  const renderImpact = (impact: string) => {
    return (
      <div className="flex gap-0.5 items-center" title={`${impact} Impact`}>
        <div className={cn("w-1.5 h-3 rounded-sm", impact === 'High' ? 'bg-red-500' : impact === 'Medium' ? 'bg-brand' : impact === 'Low' ? 'bg-muted-foreground' : 'bg-muted')} />
        <div className={cn("w-1.5 h-3 rounded-sm", impact === 'High' ? 'bg-red-500' : impact === 'Medium' ? 'bg-brand' : 'bg-muted')} />
        <div className={cn("w-1.5 h-3 rounded-sm", impact === 'High' ? 'bg-red-500' : 'bg-muted')} />
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Economic Calendar</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Monitor real-time macroeconomic events and indicators that drive volatility in precious and base metals markets.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-sm font-semibold shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand text-brand-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-bold shadow-sm">
            <CalendarIcon className="w-4 h-4" />
            This Week
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 font-semibold text-muted-foreground w-24">Time</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground w-20">Cur</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground w-24">Imp</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Event</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right w-24">Actual</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right w-24">Forecast</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right w-24">Previous</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedEvents).map(([date, dayEvents]) => (
                <React.Fragment key={date}>
                  {/* Date Header Row */}
                  <tr className="bg-muted/50 border-y border-border">
                    <td colSpan={7} className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground">
                      {date}
                    </td>
                  </tr>
                  
                  {/* Events for this Date */}
                  {dayEvents.map((event) => (
                    <tr key={event.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-4 font-mono text-muted-foreground flex items-center gap-2">
                        <Clock className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                        {event.time}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-muted text-xs font-bold text-foreground">
                          {event.currency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {renderImpact(event.impact)}
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        {event.event}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "font-mono font-semibold",
                          event.actual !== '-' 
                            ? (event.actual >= event.forecast ? 'text-up' : 'text-down') 
                            : 'text-muted-foreground'
                        )}>
                          {event.actual}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                        {event.forecast}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                        {event.previous}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
