export const FilterBar = ({
  searchTerm,
  onSearch,
  selectedGenre,
  onGenreSelect,
}: {
  searchTerm: string;
  onSearch: (e: string) => void;
  selectedGenre: string;
  onGenreSelect: (e: string) => void;
}) => {
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
        <option value="all">All</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
      </select>
    </div>
  );
};
