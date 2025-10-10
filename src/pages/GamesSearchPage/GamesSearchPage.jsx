import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Gamepad2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

function GamesSearchPage() {
  const [gamesAPIList, setGamesAPIList] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const addGame = async (id, title, coverArt, tags, genres) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/games/`, {
        game_id: id,
        user_id: 1,
        title,
        coverArt,
        tags,
        genres,
      });
      setGamesList((prevGamesList) => [...prevGamesList, data]);
      toast.success("Game successfully added to your library! 🎮");
    } catch (error) {
      toast.error("Error adding game to library");
      console.log(error.response?.data || error);
    }
  };

  const delGame = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/games/${id}`);
      setGamesList(gamesList.filter((game) => game.id !== id));
      toast.success("Game removed from your library");
    } catch (error) {
      toast.error("Error removing game from library");
      console.log(error.response);
    }
  };

  const getGamesAPI = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/games/search`);
      setGamesAPIList(data);
    } catch (error) {
      console.error("Error fetching games", error);
      toast.error("Failed to load games");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGamesAPI();
  }, [gamesList]);

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
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Search className="w-12 h-12 text-pixelpath-primary mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-pixelpath-text mb-2">
            Discovering Games
          </h2>
          <p className="text-gray-600">Finding the perfect games for you...</p>
        </motion.div>
      </div>
    );
  }

  if (gamesAPIList.length === 0) {
    return (
      <div className="container-responsive py-16">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-gradient-to-br from-pixelpath-primary/5 to-pixelpath-secondary/5 rounded-2xl p-8">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-semibold text-pixelpath-text mb-4">
              No Games Found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any games to show you right now. Try refreshing the page or check back later!
            </p>
            <motion.button
              onClick={getGamesAPI}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-4 h-4 mr-2" />
              Try Again
            </motion.button>
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
        <div className="container-responsive text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Search className="w-8 h-8 mr-3" />
              <h1 className="text-3xl lg:text-4xl font-bold">Discover Games</h1>
            </div>
            <p className="text-pixelpath-secondary text-lg max-w-2xl mx-auto">
              Explore our curated collection of amazing games and add your favorites to your personal library
            </p>
          </motion.div>
        </div>
      </div>

      {/* Games Library */}
      <GamesLibrary
        gamesAPIList={gamesAPIList}
        isSearchPage={true}
        addGame={addGame}
        delGame={delGame}
        loading={loading}
      />
    </motion.div>
  );
}

export default GamesSearchPage;
