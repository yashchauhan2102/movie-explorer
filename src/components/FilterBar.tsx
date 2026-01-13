import { GENRES } from "../constants/genres";

interface IFilterBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

export const FilterBar = ({
  searchTerm,
  onSearch,
  selectedGenre,
  onGenreSelect,
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
        value={selectedGenre}
        onChange={(e) => onGenreSelect(e.target.value)}
      >
        {GENRES.map((genre) => (
          <option value={genre} key={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};
