import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import Card from "../../components/Card/Card";
import Select from "react-select";
import Button from "../Button/Button";
import MoodReco from "../MoodReco/MoodReco";
import themeToMoodMap from "../../utils/themeToMoodMap";
import { MotionGrid, MotionGridItem } from "../ui/MotionWrapper";
import { GridSkeleton } from "../ui/Skeleton";

function GamesLibrary({
  gamesList,
  handleSort,
  delGame,
  addGame,
  getGamesLibrary,
  gamesAPIList,
  isSearchPage,
  handleClearMood,
  loading = false,
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);
  const [moodFilter, setMoodFilter] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);

  const filteredGames = (isSearchPage ? gamesAPIList : gamesList).filter(
    (game) => {
      const matchesSearch = game.title
        ?.toLowerCase()
        .includes(searchKeyword.toLowerCase());
      const matchesStatus = statusFilter
        ? statusFilter.value === null || game.status === statusFilter.value
        : true;
      const matchesGenre =
        !genreFilter?.value ||
        game.tags
          ?.split(",")
          .map((tag) => tag.trim().toLowerCase())
          .some((tag) => tag === genreFilter.value.toLowerCase());
      
      // Fix mood filtering for both search page (string tags) and library page (array tags)
      const matchesMood = moodFilter
        ? isSearchPage 
          ? game.tags
              ?.split(",")
              .map((tag) => tag.trim())
              .some((tag) => themeToMoodMap[tag] === moodFilter)
          : game.tags?.some((tag) => {
              const tagName = typeof tag === "string" ? tag : tag.name;
              return themeToMoodMap[tagName] === moodFilter;
            })
        : true;

      return matchesSearch && matchesStatus && matchesGenre && matchesMood;
    }
  );

  const handleClearFilters = () => {
    setSearchKeyword("");
    setStatusFilter(null);
    setGenreFilter(null);
    setMoodFilter(null);
    setSelectedMood(null);
  };

  const statusOptions = [
    { value: null, label: "All Statuses" },
    { value: "Playing", label: "Playing" },
    { value: "Completed", label: "Completed" },
    { value: "Want To Play", label: "Want To Play" },
  ];

  const genreOptions = [
    { value: null, label: "All Genres" },
    { value: "Puzzle", label: "Puzzle" },
    { value: "Shooter", label: "Shooter" },
    { value: "Adventure", label: "Adventure" },
    { value: "Action", label: "Action" },
  ];

  const handleStatusChange = (selectedOption) => {
    setStatusFilter(selectedOption);
  };

  const handleGenreChange = (selectedOption) => {
    setGenreFilter(selectedOption);
  };

  // Show skeleton loading state
  if (loading) {
    return (
      <div>
        {isSearchPage ? (
          <motion.div 
            className="text-center py-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="page-header mb-4 bg-gradient-to-r from-pixelpath-primary to-pixelpath-accent bg-clip-text text-transparent">
              Discover Games
            </h3>
            <p className="body-text max-w-2xl mx-auto">
              Explore top-rated games tailored to your interests. Select "+" to
              add favorites to your library and start building your ultimate
              collection! 🎮✨
            </p>
          </motion.div>
        ) : (
          <MoodReco
            setMoodFilter={setMoodFilter}
            setSelectedMood={setSelectedMood}
            selectedMood={selectedMood}
          />
        )}
        
        {/* Skeleton Loading Grid */}
        <GridSkeleton count={8} />
      </div>
    );
  }

  if (!gamesList && !gamesAPIList) return <GridSkeleton count={6} />;

  return (
    <div>
      {isSearchPage ? (
        <motion.div 
          className="text-center py-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="page-header mb-4 bg-gradient-to-r from-pixelpath-primary to-pixelpath-accent bg-clip-text text-transparent">
            Discover Games
          </h3>
          <p className="body-text max-w-2xl mx-auto">
            Explore top-rated games tailored to your interests. Select "+" to
            add favorites to your library and start building your ultimate
            collection! 🎮✨
          </p>
        </motion.div>
      ) : (
        <MoodReco
          setMoodFilter={setMoodFilter}
          setSelectedMood={setSelectedMood}
          selectedMood={selectedMood}
        />
      )}

      {/* Modern Search and Filter Bar */}
      <motion.div 
        className="container-responsive py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <motion.input
                  type="text"
                  placeholder="Search games..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl 
                           focus:border-pixelpath-primary focus:ring-2 focus:ring-pixelpath-primary/20 
                           transition-all duration-200 text-pixelpath-text placeholder-gray-400
                           hover:border-gray-300 focus:outline-none shadow-sm hover:shadow-md focus:shadow-md"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
                {searchKeyword && (
                  <motion.button
                    onClick={() => setSearchKeyword('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="w-full sm:w-64">
              <Select
                options={isSearchPage ? genreOptions : statusOptions}
                placeholder={isSearchPage ? "Filter by Genre..." : "Filter by Status..."}
                onChange={isSearchPage ? handleGenreChange : handleStatusChange}
                value={isSearchPage ? genreFilter : statusFilter}
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: '48px',
                    borderColor: state.isFocused ? '#9a7aa0' : '#e5e7eb',
                    boxShadow: state.isFocused ? '0 0 0 2px rgba(154, 122, 160, 0.2)' : 'none',
                    borderRadius: '12px',
                    '&:hover': {
                      borderColor: '#9a7aa0'
                    }
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#9ca3af'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#9a7aa0' : state.isFocused ? '#f3f0f5' : 'white',
                    color: state.isSelected ? 'white' : '#2d333a',
                    ':active': {
                      backgroundColor: '#9a7aa0'
                    }
                  })
                }}
              />
            </div>
          </div>

          {/* Sort Buttons - Only for Library Page */}
          {!isSearchPage && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Sort by:</span>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => handleSort("title")}
                  className="hover:bg-pixelpath-primary hover:text-white transition-colors"
                >
                  Title
                </Button>
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => handleSort("rating")}
                  className="hover:bg-pixelpath-primary hover:text-white transition-colors"
                >
                  Rating
                </Button>
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => handleSort("status")}
                  className="hover:bg-pixelpath-primary hover:text-white transition-colors"
                >
                  Status
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleClearFilters}
                  className="ml-2"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(searchKeyword || statusFilter || genreFilter || moodFilter) && (
            <motion.div 
              className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <span className="text-sm font-medium text-gray-600">Active filters:</span>
              {searchKeyword && (
                <div className="inline-flex items-center px-3 py-1 bg-pixelpath-primary/10 text-pixelpath-primary rounded-full text-sm">
                  Search: "{searchKeyword}"
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="ml-2 hover:bg-pixelpath-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {statusFilter && (
                <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Status: {statusFilter.label}
                  <button
                    onClick={() => setStatusFilter(null)}
                    className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {genreFilter && (
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Genre: {genreFilter.label}
                  <button
                    onClick={() => setGenreFilter(null)}
                    className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {moodFilter && (
                <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Mood: {moodFilter}
                  <button
                    onClick={() => {setMoodFilter(null); setSelectedMood(null);}}
                    className="ml-2 hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      <MotionGrid className="flex flex-wrap justify-center gap-4 mt-8 px-4">
        {filteredGames.length === 0 ? (
          <motion.div
            className="w-full text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3 
              }}
            >
              🎮
            </motion.div>
            <h3 className="text-xl font-semibold text-pixelpath-text mb-2">
              No games found
            </h3>
            <p className="result-message text-gray-600 mb-6">
              {searchKeyword || statusFilter || genreFilter || moodFilter
                ? "No games match your current filters. Try adjusting your search criteria."
                : isSearchPage 
                  ? "No games available to discover right now."
                  : "Your collection is empty. Start adding some games!"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {(searchKeyword || statusFilter || genreFilter || moodFilter) && (
                <Button 
                  variant="secondary" 
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              )}
              {!isSearchPage && (
                <Button 
                  variant="primary" 
                  onClick={() => window.location.href = '/search'}
                >
                  Discover Games
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          filteredGames.map((game, index) => (
            <MotionGridItem key={game.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  game={game}
                  gameid={game.id}
                  title={game.title}
                  delGame={delGame}
                  addGame={addGame}
                  getGamesLibrary={getGamesLibrary}
                  isSearchPage={isSearchPage}
                />
              </motion.div>
            </MotionGridItem>
          ))
        )}
      </MotionGrid>
    </div>
  );
}

export default GamesLibrary;
