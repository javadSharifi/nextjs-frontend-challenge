'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { SelectGroupProps } from '../_lib/select.types';

const SelectGroup = ({ label }: SelectGroupProps) => {
  return (
    <div className="flex items-center px-3 py-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-background border-y border-primary/20 shadow-sm">
      {label}
    </div >
  );
};

export default SelectGroup;
