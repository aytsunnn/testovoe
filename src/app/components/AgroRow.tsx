"use client";

import { Person, TogglePresenceType } from './types';

interface AgroRowProps {
  item: Person;
  togglePresence: TogglePresenceType;
}

export default function AgroRow({ item, togglePresence }: AgroRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.company}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.group}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <input
          type="checkbox"
          checked={item.present}
          onChange={() => togglePresence(item.id)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
    </tr>
  );
}