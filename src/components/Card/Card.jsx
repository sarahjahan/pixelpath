import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, PlusCircle, MinusCircle, Star } from "lucide-react";
import GameForm from "../GameForm/GameForm";
import adjustCoverArtUrl from "../../utils/adjustCoverArtUrl";
import { useIntersectionObserver } from "../../hooks/usePerformance";
import clsx from "clsx";

function Card({
  game,
  delGame,
  addGame,
  gameid,
  getGamesLibrary,
  isSearchPage,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef();
  const { hasIntersected } = useIntersectionObserver(cardRef, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { coverArt, title, status, rating, notes, tags, id, isOwned } = game;
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
          "w-4 h-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <motion.div
      ref={cardRef}
      className={`card bg-white rounded-2xl p-4 sm:p-6 m-2 sm:m-3 shadow-lg hover:shadow-2xl 
                 transition-all duration-500 border border-gray-100 
                 flex flex-col min-w-0 w-full 
                 sm:w-80 md:w-72 lg:w-80 xl:w-72
                 ${isSearchPage ? 'h-[420px] sm:h-[440px] md:h-[460px]' : 'h-[560px] sm:h-[580px] md:h-[600px]'}
                 backdrop-blur-sm relative overflow-hidden group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Subtle gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-pixelpath-primary/5 to-pixelpath-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {isSearchPage ? (
        <>
          {/* Search Page Card */}
          <div className="flex flex-col items-center text-center relative z-10 h-full p-3">
            {/* Cover Art - Optimized size */}
            <motion.div
              className="w-36 h-48 sm:w-40 sm:h-52 rounded-lg shadow-md bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden relative group/image mx-auto flex-shrink-0"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {hasIntersected && (
                <motion.img
                  className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                  src={newUrl}
                  alt={title}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {!imageLoaded && hasIntersected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-pixelpath-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {/* Subtle overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
            </motion.div>
            
            {/* Content section - Consistent spacing */}
            <div className="flex flex-col items-center space-y-3 mt-3 flex-grow">
              <h3 className="font-bold text-base sm:text-lg text-pixelpath-text line-clamp-2 leading-snug text-center">
                {title}
              </h3>
              {tags && (
                <div className="flex flex-wrap justify-center gap-1">
                  <span className="px-2 py-1 bg-pixelpath-primary/10 text-pixelpath-primary text-xs font-medium rounded-full line-clamp-1">
                    {Array.isArray(tags) ? tags.slice(0, 2).join(', ') : tags.split(',').slice(0, 2).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Library Page Card */}
          <motion.div
            className="flex flex-col items-center cursor-pointer space-y-3 relative z-10 h-full"
            onClick={() => navigate(`/details/${gameid}`)}
            whileHover={{ scale: 1.01 }}
          >
            {/* Status Badge - Fixed height */}
            <div className="w-full h-8 flex justify-start">
              {status && (
                <motion.div 
                  className={clsx("px-4 py-1 rounded-full text-sm font-semibold shadow-sm", getStatusBadgeClass(status))}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {status}
                </motion.div>
              )}
            </div>

            {/* Elegant Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-pixelpath-primary/30 to-transparent relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixelpath-secondary/20 to-transparent"></div>
            </div>

            {/* Cover Art - Fixed size */}
            <motion.div
              className="w-40 h-52 sm:w-44 sm:h-56 rounded-xl shadow-lg bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden relative group/image mx-auto flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {hasIntersected && (
                <motion.img
                  className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                  src={newUrl}
                  alt={title}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {!imageLoaded && hasIntersected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-pixelpath-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Game Info - Flexible section that fills remaining space */}
            <div className="text-center space-y-2 w-full flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-lg sm:text-xl text-pixelpath-text line-clamp-2 leading-tight h-12 flex items-center justify-center">
                  {title}
                </h3>

              {/* Rating */}
              {rating && rating !== 0 ? (
                <motion.div 
                  className="relative group/rating"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-lg border border-yellow-200/50">
                    <span className="text-xs font-medium text-gray-700">My Rating:</span>
                    <div className="flex space-x-1">
                      {renderStars(rating)}
                    </div>
                    <span className="text-xs font-bold text-yellow-600">{rating}/5</span>
                  </div>
                  
                  {/* Hover tooltip */}
                  <motion.div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 
                               bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 
                               group-hover/rating:opacity-100 transition-opacity duration-200 pointer-events-none z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-center">
                      <div className="font-semibold">
                        {rating === 5 ? "Masterpiece!" : 
                         rating === 4 ? "Great Game" : 
                         rating === 3 ? "Good" : 
                         rating === 2 ? "Okay" : "Not Great"}
                      </div>
                      <div className="text-xs opacity-75">Click to edit</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                                    border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  className="px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50 group/no-rating"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-500 text-xs font-medium group-hover/no-rating:text-gray-600 transition-colors">
                    ⭐ Not Rated Yet
                  </p>
                </motion.div>
              )}

                {/* Notes Preview - Fixed height section */}
                <div className="min-h-[50px] flex items-center justify-center">
                  {notes ? (
                    <motion.div 
                      className="bg-pixelpath-bg/50 p-2 rounded-lg border border-pixelpath-primary/10 cursor-pointer w-full"
                      whileHover={{ backgroundColor: "rgba(154, 122, 160, 0.05)" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setNotesExpanded(!notesExpanded);
                      }}
                    >
                      <p className="text-xs text-gray-700 font-medium leading-relaxed line-clamp-2">
                        "{notes}"
                      </p>
                    </motion.div>
                  ) : (
                    <div className="text-xs text-gray-400 italic">No notes yet</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Action Buttons - Consistent positioning */}
      <div className="flex justify-center space-x-2 mt-auto pt-3 border-t border-gray-100 relative z-10">
        {isSearchPage ? (
          isOwned ? (
            <motion.button
              className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:bg-red-50 
                         rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300 
                         shadow-sm hover:shadow-md font-medium text-xs"
              onClick={() => delGame(gameid)}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <MinusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Remove</span>
            </motion.button>
          ) : (
            <motion.button
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-green-600 hover:bg-green-50 
                         rounded-xl transition-all duration-200 border border-green-200 hover:border-green-300 
                         shadow-sm hover:shadow-md font-medium text-sm"
              onClick={() => addGame(id, title, coverArt, tags)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Add to Library</span>
              <span className="sm:hidden">Add</span>
            </motion.button>
          )
        ) : (
          <>
            <motion.button
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-red-600 hover:bg-red-50 
                         rounded-xl transition-all duration-200 border border-red-200 hover:border-red-300 
                         shadow-sm hover:shadow-md font-medium text-sm"
              onClick={() => delGame(gameid)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <MinusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Remove</span>
            </motion.button>
            <motion.button
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-pixelpath-primary hover:bg-purple-50 
                         rounded-xl transition-all duration-200 border border-pixelpath-primary/20 hover:border-pixelpath-primary/40 
                         shadow-sm hover:shadow-md font-medium text-sm"
              onClick={openModal}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </motion.button>
          </>
        )}
      </div>

      {/* Modal - Rendered via Portal */}
      <GameForm
        gameid={gameid}
        game={game}
        closeModal={closeModal}
        getGamesLibrary={getGamesLibrary}
        modalIsOpen={modalIsOpen}
      />
    </motion.div>
  );
}

export default Card;
