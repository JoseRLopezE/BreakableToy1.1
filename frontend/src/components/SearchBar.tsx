import React from 'react';
import { Search } from 'lucide-react';
import { Availability } from '../types';

interface SearchBarProps {
  searchTerm: string;
  selectedCategories: string[];
  availability: Availability;
  onSearchChange: (value: string) => void;
  onCategoriesChange: (categories: string[]) => void;
  onAvailabilityChange: (value: Availability) => void;
  onSearch: () => void;
  categories: string[];
}

export function SearchBar({
  searchTerm,
  selectedCategories,
  availability,
  onSearchChange,
  onCategoriesChange,
  onAvailabilityChange,
  onSearch,
  categories,
}: SearchBarProps) {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    onCategoriesChange(selectedOption === 'all' ? [] : [selectedOption]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
              <select
                value={selectedCategories.length > 0 ? selectedCategories[0] : 'all'}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <select
                value={availability}
                onChange={(e) => onAvailabilityChange(e.target.value as Availability)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={onSearch}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Search size={20} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}