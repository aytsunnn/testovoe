"use client";

import { Person, TogglePresenceType } from './types';

interface AgroRowProps {
  item: Person;
  togglePresence: TogglePresenceType;
}

export default function AgroRow({ item, togglePresence }: AgroRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.company}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.group}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.present ? (
          <span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>
        ) : (
          <span className="inline-block w-4 h-4 bg-red-500 rounded-full"></span>
        )}
        <input
          type="checkbox"
          checked={item.present}
          onChange={() => togglePresence(item.id)}
          hidden
        />
      </td>
    </tr>
  );
}
