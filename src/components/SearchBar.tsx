import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-10">
      {/* Icon positioned absolute */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      
      {/* Input field */}
      <input
        type="text"
        className="block w-full p-4 pl-10 text-sm text-white border border-gray-700 rounded-full bg-cine-gray focus:ring-cine-gold focus:border-cine-gold placeholder-gray-400 transition-all outline-none focus:ring-2"
        placeholder="Search for movies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}