"use client";

import { Person, TogglePresenceType } from './types';

interface AgroRowProps {
  item: Person;
  togglePresence: TogglePresenceType;
  onRowClick: (person: Person) => void;
}

export default function AgroRow({ item, togglePresence, onRowClick }: AgroRowProps) {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePresence(item.id);
  };

  return (
    <tr 
      className="hover:bg-gray-50 cursor-pointer" 
      onClick={() => onRowClick(item)}
    >
      <td className="px-6 py-4 whitespace-nowrap text-lg">{item.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-lg">{item.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-lg">{item.company}</td>
      <td className="px-6 py-4 whitespace-nowrap text-lg">{item.group}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div 
          onClick={handleCheckboxClick}
          className="inline-block w-8 h-8 rounded-full cursor-pointer"
          style={{ backgroundColor: item.present ? '#80BB00' : '#EC5937' }}
        />
      </td>
    </tr>
  );
}
