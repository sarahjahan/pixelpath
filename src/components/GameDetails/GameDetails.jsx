import { motion } from "framer-motion";
import { Star, BookOpen, Tag, ArrowLeft, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import adjustCoverArtUrl from "../../utils/adjustCoverArtUrl";
import clsx from "clsx";

function GameDetails({ gameDetails }) {
  const navigate = useNavigate();
  const {
    title,
    coverArt,
    notes,
    rating,
    status,
    summary,
    tags = [],
  } = gameDetails;

  const newUrl = adjustCoverArtUrl(coverArt, "t_cover_big");

  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase().replace(/\s+/g, "");
    switch (statusLower) {
      case "completed":
        return "status-completed";
      case "playing":
        return "status-playing";
      case "wanttoplay":
        return "status-want-to-play";
      default:
        return "badge-primary";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={clsx(
          "w-5 h-5",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className="container-responsive py-8">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-pixelpath-primary hover:text-pixelpath-primary/80 mb-6 transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Library</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Game Cover & Main Info */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-cozy hover:shadow-cozy-lg transition-all duration-300 text-center">
            {/* Cover Art */}
            <motion.div
              className="relative mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                className="w-full max-w-xs mx-auto rounded-xl shadow-cozy aspect-cover object-cover"
                src={newUrl}
                alt={title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-2xl lg:text-3xl font-bold text-pixelpath-text mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h1>

            {/* Status Badge */}
            {status && (
              <motion.div
                className="flex justify-center mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className={clsx("inline-flex", getStatusBadgeClass(status))}>
                  {status}
                </div>
              </motion.div>
            )}

            {/* Rating */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center mb-2">
                <span className="text-sm font-medium text-gray-600 mr-3">My Rating:</span>
                <div className="flex space-x-1">
                  {rating && rating > 0 ? (
                    renderStars(rating)
                  ) : (
                    <span className="text-gray-400 text-sm">Not rated yet</span>
                  )}
                </div>
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600">{rating}/5 stars</p>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Game Details & Personal Info */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Game Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-cozy hover:shadow-cozy-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <BookOpen className="w-5 h-5 text-pixelpath-primary mr-2" />
              <h2 className="text-xl font-semibold text-pixelpath-text">About This Game</h2>
            </div>
            {summary ? (
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            ) : (
              <p className="result-message">No game summary available.</p>
            )}
          </div>

          {/* Personal Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-cozy hover:shadow-cozy-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Edit className="w-5 h-5 text-pixelpath-primary mr-2" />
                <h2 className="text-xl font-semibold text-pixelpath-text">My Notes</h2>
              </div>
            </div>
            {notes && notes.length > 0 ? (
              <div className="bg-pixelpath-bg rounded-lg p-4">
                <p className="text-gray-700 italic leading-relaxed">"{notes}"</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📝</div>
                <p className="result-message">No personal notes yet.</p>
                <p className="text-sm text-gray-500">Edit this game to add your thoughts!</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl p-6 shadow-cozy hover:shadow-cozy-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <Tag className="w-5 h-5 text-pixelpath-primary mr-2" />
              <h2 className="text-xl font-semibold text-pixelpath-text">Tags</h2>
            </div>
            {tags && tags.filter((tag) => tag && tag.name).length > 0 ? (
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, staggerChildren: 0.05 }}
              >
                {tags
                  .filter((tag) => tag && tag.name)
                  .map((tag, index) => (
                    <motion.div
                      key={tag.id}
                      className="badge-primary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag.name}
                    </motion.div>
                  ))}
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🏷️</div>
                <p className="result-message">No tags added yet.</p>
                <p className="text-sm text-gray-500">Edit this game to add relevant tags!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GameDetails;
