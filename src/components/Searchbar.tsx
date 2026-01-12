export const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: string) => void;
}) => {
  return (
    <div style={{ paddingBottom: "50px" }}>
      <input
        type="search"
        size={100}
        placeholder="Search Movies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
