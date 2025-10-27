interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                px-4 py-2 rounded-full font-body text-sm md:text-base whitespace-nowrap
                transition-all duration-200 flex-shrink-0
                ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
