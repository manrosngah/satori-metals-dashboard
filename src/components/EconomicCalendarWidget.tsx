import React from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const upcomingEvents = [
  { id: 1, time: '08:30 AM', country: 'US', currency: 'USD', event: 'Core CPI m/m', impact: 'High', actual: '0.3%', forecast: '0.3%' },
  { id: 2, time: '10:00 AM', country: 'US', currency: 'USD', event: 'ISM Manufacturing PMI', impact: 'High', actual: '-', forecast: '49.5' },
  { id: 3, time: '02:00 PM', country: 'US', currency: 'USD', event: 'FOMC Statement', impact: 'High', actual: '-', forecast: '-' },
  { id: 5, time: '04:00 AM', country: 'EU', currency: 'EUR', event: 'ECB Lagarde Speaks', impact: 'Medium', actual: '-', forecast: '-' },
];

export default function EconomicCalendarWidget() {
  const renderImpact = (impact: string) => {
    return (
      <div className="flex gap-0.5 items-center" title={`${impact} Impact`}>
        <div className={cn("w-1 h-2 rounded-sm", impact === 'High' ? 'bg-red-500' : impact === 'Medium' ? 'bg-brand' : impact === 'Low' ? 'bg-muted-foreground' : 'bg-muted')} />
        <div className={cn("w-1 h-2 rounded-sm", impact === 'High' ? 'bg-red-500' : impact === 'Medium' ? 'bg-brand' : 'bg-muted')} />
        <div className={cn("w-1 h-2 rounded-sm", impact === 'High' ? 'bg-red-500' : 'bg-muted')} />
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-2xl flex flex-col h-full shadow-lg">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-brand" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Economic Calendar</h3>
        </div>
        <Link to="/calendar" className="text-xs font-bold text-muted-foreground hover:text-brand flex items-center gap-1 transition-colors">
          Full View <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-4 py-3 font-semibold text-muted-foreground w-16 text-xs">Time</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground w-12 text-xs">Cur</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground w-12 text-xs">Imp</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground text-xs">Event</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground text-right text-xs">Act</th>
            </tr>
          </thead>
          <tbody>
            {upcomingEvents.map((event) => (
              <tr key={event.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors group last:border-0">
                <td className="px-4 py-3 font-mono text-muted-foreground text-xs flex items-center gap-1.5">
                  <Clock className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {event.time.split(' ')[0]}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-muted text-[10px] font-bold text-foreground">
                    {event.currency}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {renderImpact(event.impact)}
                </td>
                <td className="px-4 py-3 font-medium text-foreground text-xs truncate max-w-[120px]">
                  {event.event}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={cn(
                    "font-mono font-semibold text-xs",
                    event.actual !== '-' 
                      ? (event.actual >= event.forecast ? 'text-up' : 'text-down') 
                      : 'text-muted-foreground'
                  )}>
                    {event.actual}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
