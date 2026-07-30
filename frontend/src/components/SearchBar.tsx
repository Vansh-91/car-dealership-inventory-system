interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by make, model or category..."
      className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-text placeholder:text-text-secondary outline-none focus:border-primary transition mb-8"
    />
  );
};

export default SearchBar;