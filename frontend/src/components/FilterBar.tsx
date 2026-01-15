import { MOVIE_TYPES } from "../constants/movie";

interface IFilterBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

export const FilterBar = ({
  searchTerm,
  onSearch,
  selectedType,
  onTypeSelect,
}: IFilterBarProps) => {
  return (
    <div style={{ paddingBottom: "50px", display: "flex", gap: "25px" }}>
      <input
        type="search"
        size={100}
        placeholder="Search Movies..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        value={selectedType}
        onChange={(e) => onTypeSelect(e.target.value)}
      >
        {MOVIE_TYPES.map((type) => (
          <option value={type.toLowerCase()} key={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
