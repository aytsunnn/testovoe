import { useState, useEffect } from "react";
import { Person } from "./types";
import Image from "next/image";

interface AddModalProps {
  person?: Person | null;
  onSave: (person: Omit<Person, "id">) => void;
  onDelete?: (id: number) => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function AddModal({
  person,
  onSave,
  onDelete,
  onClose,
  isOpen,
}: AddModalProps) {
  const [formData, setFormData] = useState<Omit<Person, "id">>({
    name: "",
    company: "",
    group: "",
    present: false,
  });

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name,
        company: person.company,
        group: person.group,
        present: person.present,
      });
    } else {
      setFormData({
        name: "",
        company: "",
        group: "",
        present: false,
      });
    }
  }, [person]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (person && onDelete) {
      onDelete(person.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-2xl w-2/3 max-w-4xl mx-auto relative">
        <Image
          src="/zakrivashka.png"
          alt="close"
          width={25}
          height={25}
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        />

        <div className="max-w-1/2 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center gap-4">
              <label className="block text-[#4E3000] w-24">ФИО</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 p-2 border-none rounded-lg shadow-sm border border-[#E9E9E9] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent appearance-none"
                required
              />
            </div>

            <div className="mb-4 flex items-center gap-4">
              <label className="block text-[#4E3000] w-24">Компания</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="flex-1 p-2 border-none rounded-lg shadow-sm border border-[#E9E9E9] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent appearance-none"
                required
              />
            </div>

            <div className="mb-4 flex items-center gap-4">
              <label className="block text-[#4E3000] w-24">Группа</label>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="flex-1 p-2 border-none rounded-lg shadow-sm border border-[#E9E9E9] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent appearance-none"
                required
              >
                <option value="" className="text-[#4E3000] hover:bg-[#4CAF50]/10">Выберите группу</option>
                <option value="Партнер" className="text-[#4E3000] hover:bg-[#4CAF50]/10">Партнер</option>
                <option value="Прохожий" className="text-[#4E3000] hover:bg-[#4CAF50]/10">Прохожий</option>
                <option value="Организатор" className="text-[#4E3000] hover:bg-[#4CAF50]/10">Организатор</option>
              </select>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <label className="block text-[#4E3000] w-24">Присутствие</label>
              <div className="flex-1 flex items-center">
                <input
                  type="checkbox"
                  name="present"
                  checked={formData.present || false}
                  onChange={handleChange}
                  className="mr-2 w-5 h-5 rounded cursor-pointer focus:outline-none accent-[#4CAF50]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {person ? (
                // Режим редактирования
                <>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 bg-[#EC5937] hover:bg-[#D94C2B] text-white rounded shadow-md transition-colors"
                  >
                    Удалить
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4CAF50] hover:bg-[#477c48] text-white rounded shadow-md transition-colors"
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-[#737373] hover:bg-[#5a5a5a] text-white rounded shadow-md transition-colors"
                  >
                    Отмена
                  </button>
                </>
              ) : (
                // Режима добавления
                <>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4CAF50] hover:bg-[#477c48] text-white rounded shadow-md transition-colors"
                  >
                    Добавить
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-[#737373] hover:bg-[#5a5a5a] text-white rounded shadow-md transition-colors"
                  >
                    Закрыть
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
