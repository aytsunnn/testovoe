"use client";

import { FilterType } from './types';

interface AgroFiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export default function AgroFilters({ filter, setFilter }: AgroFiltersProps) {
  return (
    <div className="fixed bottom-0 left-0 p-4 bg-white shadow-md w-full">
      <div className="mb-4 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Фильтровать по:</span>
        <button
          onClick={() => setFilter('absent')}
          className={`px-3 py-1 text-sm rounded ${filter === 'absent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Отсутствующим
        </button>
        <button
          onClick={() => setFilter('present')}
          className={`px-3 py-1 text-sm rounded ${filter === 'present' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Присутствующим
        </button>
      </div>
    </div>
  );
}