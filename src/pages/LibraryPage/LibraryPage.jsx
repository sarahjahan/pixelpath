import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Library, BookOpen, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "../../components/ui/MicroInteractions";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

function LibraryPage() {
  const [gamesList, setGamesList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const delGame = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/games/${id}`);
      const updatedGames = gamesList.filter((game) => game.id !== id);
      setGamesList(updatedGames);
      setFilteredGames(updatedGames);
      toast.success("Game removed from your library");
    } catch (error) {
      toast.error("Error removing game from library");
      console.log(error.response);
    }
  };

  const getGamesLibrary = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/games`);
      setGamesList(data);
      setFilteredGames(data);
    } catch (error) {
      console.error("Error fetching games", error);
      toast.error("Failed to load your game library");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGamesLibrary();
  }, []);

  const handleSort = async (sortBy = "title" || "status" || "rating") => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/games/`, {
        params: { sortBy, order: sortOrder },
      });
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      setGamesList(data);
      setFilteredGames(data);
    } catch (error) {
      console.error("Error sorting games", error);
      toast.error("Failed to sort games");
    }
  };

  if (loading) {
    return (
      <div className="container-responsive py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="inline-block p-6 bg-white rounded-2xl shadow-cozy mb-6"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Library className="w-12 h-12 text-pixelpath-primary mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-pixelpath-text mb-2">
            Loading Your Library
          </h2>
          <p className="text-gray-600">Gathering your game collection...</p>
        </motion.div>
      </div>
    );
  }

  if (gamesList.length === 0) {
    return (
      <div className="container-responsive py-16">
        <motion.div
          className="text-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-gradient-to-br from-pixelpath-primary/5 to-pixelpath-secondary/5 rounded-2xl p-8">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-3xl font-semibold text-pixelpath-text mb-4">
              Your Library is Empty
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Ready to start your gaming journey? Discover and add games to build your personal collection!
            </p>
            <Link to="/search">
              <motion.button
                className="btn-primary inline-flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Discover Games
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <div className="bg-gradient-to-r from-pixelpath-primary to-pixelpath-secondary text-white py-12">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <Library className="w-8 h-8 mr-3" />
                <h1 className="text-3xl lg:text-4xl font-bold">My Game Library</h1>
              </div>
              <p className="text-pixelpath-secondary text-lg">
                <AnimatedCounter 
                  value={gamesList.length} 
                  duration={1.5}
                  className="font-semibold"
                /> {gamesList.length === 1 ? ' game' : ' games'} in your collection
              </p>
            </div>
            
            <Link to="/search">
              <motion.button
                className="bg-white text-pixelpath-primary px-6 py-3 rounded-xl font-semibold 
                         border border-gray-200 transition-all duration-200
                         hover:bg-pixelpath-secondary hover:text-white hover:shadow-cozy
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                         inline-flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add More Games
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Games Library */}
      <GamesLibrary
        isSearchPage={false}
        gamesList={gamesList}
        handleSort={handleSort}
        delGame={delGame}
        getGamesLibrary={getGamesLibrary}
        loading={loading}
      />
    </motion.div>
  );
}

export default LibraryPage;
