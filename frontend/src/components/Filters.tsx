interface Props {
  category: string;
  setCategory: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
}

const Filters = ({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: Props) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-card border border-border rounded-xl px-4 py-3"
      >
        <option value="">All Categories</option>
        <option>Sedan</option>
        <option>SUV</option>
        <option>Truck</option>
        <option>Hatchback</option>
        <option>Luxury</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="bg-card border border-border rounded-xl px-4 py-3"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="bg-card border border-border rounded-xl px-4 py-3"
      />

      <button
        onClick={() => {
          setCategory("");
          setMinPrice("");
          setMaxPrice("");
        }}
        className="bg-primary hover:bg-primary-hover text-background rounded-xl font-bold"
      >
        Clear Filters
      </button>

    </div>
  );
};

export default Filters;