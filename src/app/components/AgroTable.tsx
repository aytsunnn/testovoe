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
      <div className='flex flex-row'>  
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Агроном Сад"
            width={187}
            height={89}
            priority
          />
        </div>

        <div className="ml-8 mt-4 ">
          <input
              type="text"
              placeholder="Поиск по имени"
              className="pl-6 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
      </div>
      
      <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Номер</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ФИО</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Добавить</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Группа</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Присутствие</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {filteredData.map((item) => (
              <AgroRow key={item.id} item={item} togglePresence={togglePresence} />
            ))}
          </tbody>
        </table>
      </div>
      <AgroFilters filter={filter} setFilter={setFilter} />
    </div>
  );
}