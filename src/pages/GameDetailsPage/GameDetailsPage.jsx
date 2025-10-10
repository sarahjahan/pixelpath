import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Gamepad2 } from "lucide-react";
import GameDetails from "../../components/GameDetails/GameDetails";
import { GameDetailsSkeleton } from "../../components/ui/Skeleton";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function GameDetailsPage() {
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { gameid } = useParams();
  const navigate = useNavigate();

  const getGameDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`${BASE_URL}/api/games/${gameid}`);
      setGameDetails(data);
    } catch (error) {
      console.error(`Error fetching game with ID ${gameid}:`, error);
      setError(error.response?.data?.message || "Failed to load game details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameid) {
      getGameDetails();
    }
  }, [gameid]);

  // Loading State
  if (loading) {
    return <GameDetailsSkeleton />;
  }

  // Error State
  if (error) {
    return (
      <div className="container-responsive py-16">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-cozy">
            <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-pixelpath-text mb-2">
              Game Not Found
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <motion.button
              onClick={() => navigate('/library')}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Library
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Content
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GameDetails gameDetails={gameDetails} />
    </motion.div>
  );
}

export default GameDetailsPage;
