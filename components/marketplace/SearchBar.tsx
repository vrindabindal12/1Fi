'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search products, brands...' }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);

  // Debounce API search by 350ms
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, 350);

    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4 stroke-[2.2]" />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl text-xs font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus-visible:ring-purple-600/30 focus-visible:border-purple-600 transition-all"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
