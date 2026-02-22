'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdvancedSelect from './_components/AdvancedSelect';
import SelectTrigger from './_components/SelectTrigger';
import SelectContent from './_components/SelectContent';
import SelectSearch from './_components/SelectSearch';
import SelectActions from './_components/SelectActions';
import { Option } from './_lib/select.types';

const DemoPage = () => {
  // 1,000 items with virtualization
  const [options1k] = useState<Option<string>[]>(() => generateOptions(1000, 'Virtual Item'));
  const [value1k, setValue1k] = useState<string[]>([]);

  // 10,000 items stress test
  const [options10k] = useState<Option<string>[]>(() => generateOptions(10000, 'Enterprise Item'));
  const [value10k, setValue10k] = useState<string | string[]>([]);

  // Grouped options
  const [groupedOptions] = useState<Option<string>[]>(() => [
    ...generateOptions(5, 'Action', 'Movies'),
    ...generateOptions(5, 'Comedy', 'Movies'),
    ...generateOptions(5, 'Thriller', 'Movies'),
    ...generateOptions(5, 'Breaking Bad', 'TV Shows'),
    ...generateOptions(5, 'Dark', 'TV Shows'),
  ]);
  const [valueGrouped, setValueGrouped] = useState<string[]>([]);

  // Async simulated fetch
  const [asyncOptions, setAsyncOptions] = useState<Option<string>[]>([]);
  const [isAsyncLoading, setIsAsyncLoading] = useState(false);

  useEffect(() => {
    setIsAsyncLoading(true);
    const timer = setTimeout(() => {
      setAsyncOptions(generateOptions(100, 'Async Option'));
      setIsAsyncLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handle1kChange = useCallback((val: string | string[]) => {
    setValue1k(val as string[]);
  }, []);

  const handle10kChange = useCallback((val: string | string[]) => {
    setValue10k(val);
  }, []);

  return (
    <div className="space-y-12 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Multi-Select 1k */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Multi-Select (1,000 Items)</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20">VIRTUALIZED</span>
          </div>
          <div className="glass-card p-8 rounded-3xl neon-border">
            <AdvancedSelect
              mode="multi"
              options={options1k}
              value={value1k}
              onChange={handle1kChange}
              placeholder="Search among 1,000 items..."
            >
              <SelectTrigger />
              <SelectContent>
                <SelectSearch />
                <SelectActions />
              </SelectContent>
            </AdvancedSelect>
            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Selected Count</p>
              <p className="text-2xl font-black italic">{value1k.length}</p>
            </div>
          </div>
        </div>

        {/* Single-Select 10k Stress Test */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Stress Test (10,000 Items)</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/20">PERFORMANCE</span>
          </div>
          <div className="glass-card p-8 rounded-3xl">
            <AdvancedSelect
              mode="single"
              options={options10k}
              value={value10k}
              onChange={handle10kChange}
              placeholder="Instant search in 10,000 items..."
            >
              <SelectTrigger />
              <SelectContent>
                <SelectSearch />
              </SelectContent>
            </AdvancedSelect>
            <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Current Value</p>
              <p className="text-sm font-medium truncate">{value10k || 'None selected'}</p>
            </div>
          </div>
        </div>

        {/* Grouped Options */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold tracking-tight text-foreground px-2">Grouped & Multi-Select</h3>
          <div className="glass-card p-8 rounded-3xl">
            <AdvancedSelect
              mode="multi"
              options={groupedOptions}
              value={valueGrouped}
              onChange={(val) => setValueGrouped(val as string[])}
              placeholder="Browse categories..."
            >
              <SelectTrigger />
              <SelectContent>
                <SelectSearch />
                <SelectActions />
              </SelectContent>
            </AdvancedSelect>
          </div>
        </div>

        {/* Async & Loading */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold tracking-tight text-foreground px-2">Async Data Support</h3>
          <div className="glass-card p-8 rounded-3xl">
            <AdvancedSelect
              options={asyncOptions}
              isLoading={isAsyncLoading}
              placeholder="Simulated 2s API delay..."
            >
              <SelectTrigger />
              <SelectContent>
                <SelectSearch />
              </SelectContent>
            </AdvancedSelect>
          </div>
        </div>

        {/* RTL Example */}
        <div className="flex flex-col gap-4" dir="rtl">
          <h3 className="text-lg font-bold tracking-tight text-foreground px-2 text-right">RTL Support (תמיכה ב-RTL)</h3>
          <div className="glass-card p-8 rounded-3xl">
            <AdvancedSelect
              options={options1k.slice(0, 50)}
              placeholder="חיפוש..."
            >
              <SelectTrigger />
              <SelectContent>
                <SelectSearch placeholder="חפש כאן..." />
              </SelectContent>
            </AdvancedSelect>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold tracking-tight text-foreground px-2">Empty State</h3>
          <div className="glass-card p-8 rounded-3xl">
            <AdvancedSelect
              options={[]}
              placeholder="No options here..."
            >
              <SelectTrigger />
              <SelectContent>
                <SelectSearch />
              </SelectContent>
            </AdvancedSelect>
          </div>
        </div>
      </div>
    </div>
  );
};

function generateOptions(count: number, prefix: string, group?: string): Option<string>[] {
  return Array.from({ length: count }, (_, i) => ({
    value: `${prefix.toLowerCase().replace(/\s+/g, '-')}-${i}`,
    label: `${prefix} ${i + 1}`,
    group: group || (count > 20 ? `Group ${Math.floor(i / (count / 5)) + 1}` : undefined),
  }));
}

export default DemoPage;
