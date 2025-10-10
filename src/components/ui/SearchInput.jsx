import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import clsx from 'clsx';

function SearchInput({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  loading = false,
  debounceMs = 300,
  showClearButton = true,
  disabled = false,
  ...props
}) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange && localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange, value]);

  // Sync with external value changes
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  const handleClear = () => {
    setLocalValue('');
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
  };

  return (
    <motion.div
      className={clsx(
        'relative',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={clsx(
        'relative flex items-center transition-all duration-200',
        'bg-white rounded-lg border-2 shadow-sm',
        isFocused 
          ? 'border-pixelpath-primary shadow-cozy ring-2 ring-pixelpath-primary/20' 
          : 'border-gray-200 hover:border-gray-300',
        disabled && 'opacity-50 cursor-not-allowed'
      )}>
        {/* Search Icon */}
        <div className="flex items-center justify-center w-10 h-10 text-gray-400">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Search className="w-4 h-4" />
            </motion.div>
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'flex-1 h-10 px-2 py-2 text-sm bg-transparent',
            'placeholder-gray-400 text-pixelpath-text',
            'border-none outline-none',
            'disabled:cursor-not-allowed'
          )}
          {...props}
        />

        {/* Clear Button */}
        {showClearButton && localValue && (
          <motion.button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center w-8 h-8 mr-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Search suggestions or results count could go here */}
    </motion.div>
  );
}

// Enhanced filter/search bar component
export function SearchBar({
  searchValue,
  onSearch,
  onFilter,
  filterOptions = [],
  selectedFilter,
  loading = false,
  placeholder = "Search games...",
  className = "",
  showFilterButton = true,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={clsx("space-y-4", className)}>
      {/* Main Search Input */}
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <SearchInput
            value={searchValue}
            onChange={onSearch}
            placeholder={placeholder}
            loading={loading}
            className="w-full"
          />
        </div>

        {/* Filter Toggle Button */}
        {showFilterButton && filterOptions.length > 0 && (
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              'flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200',
              showFilters
                ? 'border-pixelpath-primary bg-pixelpath-primary text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </motion.button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && filterOptions.length > 0 && (
        <motion.div
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-cozy"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by:</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => onFilter(option.value)}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  selectedFilter === option.value
                    ? "bg-pixelpath-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
              </motion.button>
            ))}
            
            {/* Clear filter button */}
            {selectedFilter && (
              <motion.button
                onClick={() => onFilter(null)}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SearchInput;