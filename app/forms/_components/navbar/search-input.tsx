import { Input } from '@/components/ui/input';
import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        className="peer w-full rounded-md border border-gray-300 pl-10 sm:text-sm"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
