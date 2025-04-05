import { FilterType } from "./types";

interface AgroFiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export default function AgroFilters({ filter, setFilter }: AgroFiltersProps) {
  return (
    <div className="fixed bottom-0 left-0 p-4 bg-white shadow-md w-full">
      <div className="mb-4 flex items-center gap-4">
        <span className="text-lg text-[#4E3000] font-bold">
          Фильтровать по:
        </span>
        <button
          onClick={() => setFilter("absent")}
          className={`px-3 py-1 text-sm rounded ${
            filter === "absent"
              ? "bg-[#C4C4C4] rounded-lg text-white"
              : "text-[#4E3000]"
          }`}
        >
          Отсутствующим
        </button>
        <button
          onClick={() => setFilter("present")}
          className={`px-3 py-1 text-sm rounded ${
            filter === "present"
              ? "bg-[#C4C4C4] rounded-lg text-white"
              : "text-[#4E3000]"
          }`}
        >
          Присутствующим
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 text-sm rounded ${
            filter === "all"
              ? "bg-[#C4C4C4] rounded-lg text-white"
              : "text-[#4E3000]"
          }`}
        >
          Без фильтра
        </button>
      </div>
    </div>
  );
}
