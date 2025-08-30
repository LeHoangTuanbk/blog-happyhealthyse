type BlogSearchProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
};

export const BlogSearch = ({
  searchValue,
  onSearchChange,
  placeholder = 'Search articles',
}: BlogSearchProps) => {
  return (
    <div className="relative max-w-lg">
      <label>
        <span className="sr-only">{placeholder}</span>
        <input
          aria-label={placeholder}
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
        />
      </label>
      <svg
        className="absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};
