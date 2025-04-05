"use client";

import { useState } from 'react';
import AgroRow from './AgroRow';
import AgroFilters from './AgroFilters';
import Image from 'next/image';
import { Person, FilterType } from './types';

const initialData: Person[] = [
  {
    id: 1,
    name: 'Зубенко Михаил Петрович',
    company: 'ООО "АСОЛЬ"',
    group: 'Партнер',
    present: false
  },
  {
    id: 2,
    name: 'Зубенко Михаил Петрович',
    company: 'ООО "АСОЛЬ"',
    group: 'Прохожий',
    present: false
  }
];

export default function AgroTable() {
  const [data, setData] = useState<Person[]>(initialData);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredData = data.filter(item => {
    if (filter === 'all') return true;
    return filter === 'present' ? item.present : !item.present;
  });

  const togglePresence = (id: number) => {
    setData(data.map(item => 
      item.id === id ? { ...item, present: !item.present } : item
    ));
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex flex-row items-center justify-between mb-6">
        
        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Агроном Сад"
            width={150}
            height={80}
            priority
          />
        </div>

        <div className="flex items-center mx-4 ml-10 flex-grow">
          <input
            type="text"
            placeholder="Поиск по имени"
            className="w-60 pl-4 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Поиск по компании"
            className="w-60 ml-4 pl-4 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            className="w-40 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Добавить
          </button>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end">
          <div className="text-xl">Посетители</div>
          <div className="flex gap-2">
            <div className="text-xl text-green-500">280</div>
            <div className="text-xl">/</div>
            <div className="text-xl text-red-500">35</div>
          </div>
        </div>
      </div>
      
      <div className="inline border-gray-300 rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-[#E9E9E9]">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">Номер</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">ФИО</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">Компания</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">Группа</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">Присутствие</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <AgroRow key={item.id} item={item} togglePresence={togglePresence} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <AgroFilters filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}