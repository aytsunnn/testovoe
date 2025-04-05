"use client";

import { useState, useEffect } from "react";
import AgroRow from "./AgroRow";
import AgroFilters from "./AgroFilters";
import Image from "next/image";
import { Person, FilterType } from "./types";
import AddModal from "./AddModal";

const STORAGE_KEY = "agroTableData";

const initialData: Person[] = [
  {
    id: 1,
    name: "Зубенко Михаил Петрович",
    company: 'ООО "АСОЛЬ"',
    group: "Партнер",
    present: false,
  },
  {
    id: 2,
    name: "Зубенко Михаил Петрович",
    company: 'ООО "АСОЛЬ"',
    group: "Прохожий",
    present: false,
  },
];

export default function AgroTable() {
  const [data, setData] = useState<Person[]>(initialData);
  const [filter, setFilter] = useState<FilterType>("all");
  const [nameSearch, setNameSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [isClient, setIsClient] = useState(false);

  const deletePerson = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSave = (person: Omit<Person, "id">) => {
    if (editingPerson) {
      updatePerson(editingPerson.id, person);
    } else {
      addPerson(person);
    }
  };

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isClient]);

  const filteredData = data.filter((item) => {
    if (filter === "present" && !item.present) return false;
    if (filter === "absent" && item.present) return false;

    if (
      nameSearch &&
      !item.name.toLowerCase().includes(nameSearch.toLowerCase())
    ) {
      return false;
    }

    if (
      companySearch &&
      !item.company.toLowerCase().includes(companySearch.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const togglePresence = (id: number) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, present: !item.present } : item
      )
    );
  };

  const addPerson = (person: Omit<Person, "id">) => {
    const newId = Math.max(0, ...data.map((p) => p.id)) + 1;
    setData([...data, { ...person, id: newId }]);
  };

  const updatePerson = (id: number, person: Omit<Person, "id">) => {
    setData(data.map((item) => (item.id === id ? { ...person, id } : item)));
  };

  const handleAddClick = () => {
    setEditingPerson(null);
    setIsModalOpen(true);
  };

  const handleRowClick = (person: Person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const presentCount = data.filter((item) => item.present).length;
  const absentCount = data.length - presentCount;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-white z-20">
        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Агроном Сад"
            width={130}
            height={60}
            priority
          />
        </div>

        <div className="flex items-center mx-4 ml-10 flex-grow">
          <input
            type="text"
            placeholder="Поиск по имени"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            className="w-60 pl-4 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          />
          <input
            type="text"
            placeholder="Поиск по компании"
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            className="w-60 ml-4 pl-4 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          />
          <button
            type="button"
            onClick={handleAddClick}
            className="w-40 ml-4 bg-[#4CAF50] hover:bg-[#477c48] text-white text-sm py-2 px-4 rounded"
          >
            Добавить
          </button>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end">
          <div className="text-lg text-[#4E3000] font-bold">Посетители</div>
          <div className="flex gap-2">
            <div className="text-xl text-[#80BB00]">{presentCount}</div>
            <div className="text-xl text-[#4E3000]">/</div>
            <div className="text-xl text-[#EC5937]">{absentCount}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <table className="min-w-full divide-y divide-[#E9E9E9]">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">
                Номер
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">
                ФИО
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">
                Компания
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">
                Группа
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4E3000] uppercase tracking-wider">
                Присутствие
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <AgroRow
                key={item.id}
                item={item}
                togglePresence={togglePresence}
                onRowClick={handleRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex-shrink-0 p-4 bg-white z-10">
        <AgroFilters filter={filter} setFilter={setFilter} />
      </div>

      <AddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={deletePerson}
        person={editingPerson}
      />
    </div>
  );
}
