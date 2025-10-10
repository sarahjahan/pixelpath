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
      
      // Hardcoded demo data for portfolio
      const demoGames = [
        {
          id: 1001,
          title: "The Legend of Zelda: Breath of the Wild",
          tags: "Adventure, Action, Open World",
          coverArt: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1nss.jpg",
          summary: "Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild.",
          isOwned: false,
          status: "Want to Play"
        },
        {
          id: 1002,
          title: "Red Dead Redemption 2",
          tags: "Action, Adventure, Western",
          coverArt: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg",
          summary: "An epic tale of life in America's unforgiving heartland with incredible attention to detail.",
          isOwned: false,
          status: "Want to Play"
        },
        {
          id: 1003,
          title: "Hollow Knight",
          tags: "Metroidvania, Indie, Platformer",
          coverArt: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rg1.jpg",
          summary: "A challenging 2D action-adventure through a vast ruined kingdom of insects and heroes.",
          isOwned: false,
          status: "Want to Play"
        },
        {
          id: 1004,
          title: "Cyberpunk 2077",
          tags: "RPG, Action, Sci-Fi",
          coverArt: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rtm.jpg",
          summary: "An open-world action-adventure RPG set in the megalopolis of Night City.",
          isOwned: false,
          status: "Want to Play"
        },
        {
          id: 1005,
          title: "Stardew Valley",
          tags: "Simulation, Indie, Farming",
          coverArt: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x1z.jpg",
          summary: "Escape to the countryside and create the farm of your dreams in this charming simulation.",
          isOwned: false,
          status: "Want to Play"
        },
        {
          id: 1006,
          title: "God of War",
          tags: "Action, Adventure, Norse",
          coverArt: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg",
          summary: "Journey with Kratos and Atreus through the Norse realms in this emotional adventure.",
          isOwned: false,
          status: "Want to Play"
        },
        {
          id: 1007,
          title: "Hades",
          tags: "Roguelike, Indie, Action",
          coverArt: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2145.jpg",
          summary: "Defy the god of the dead in this award-winning hack-and-slash roguelike.",
          isOwned: false,
          status: "Want to Play"
        },
        {
          id: 1008,
          title: "Animal Crossing: New Horizons",
          tags: "Simulation, Social, Casual",
          coverArt: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1mfw.jpg",
          summary: "Create your perfect island paradise and live the life you want in this relaxing simulation.",
          isOwned: false,
          status: "Want to Play"
        }
      ];
      
      setGamesAPIList(demoGames);
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
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
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
