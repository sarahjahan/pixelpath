import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Save, Gamepad2 } from "lucide-react";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

function GameForm({ gameid, getGamesLibrary, game, modalIsOpen, closeModal }) {
  const [removedTags, setRemovedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [originalTags, setOriginalTags] = useState(
    Array.isArray(game.tags) 
      ? game.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        }))
      : typeof game.tags === 'string'
      ? game.tags.split(',').map((tag, index) => ({
          id: index,
          name: tag.trim(),
        }))
      : []
  );
  const [tags, setTags] = useState(originalTags);
  const [gameDetails, setGameDetails] = useState({
    title: game.title,
    status: game.status || "",
    notes: game.notes || "",
    rating: game.rating || null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/tags`);
        setTagOptions(
          data.map((tag) => ({ label: tag.name, value: tag.name, id: tag.id }))
        );
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    getTags();

    setGameDetails({
      title: game.title,
      status: game.status || "",
      notes: game.notes || "",
      rating: game.rating || null,
    });
    const processedTags = Array.isArray(game.tags) 
      ? game.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        }))
      : typeof game.tags === 'string'
      ? game.tags.split(',').map((tag, index) => ({
          id: index,
          name: tag.trim(),
        }))
      : [];
    
    setOriginalTags(processedTags);
    setTags(processedTags);
  }, [game]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const sanitizedTags = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));
    
    try {
      await axios.put(`${BASE_URL}/api/games/${gameid}`, {
        ...gameDetails,
        tags: sanitizedTags,
        removedTags,
      });
      
      toast.success(`${game.title} updated successfully!`);
      closeModal();
      getGamesLibrary();
    } catch (error) {
      toast.error(`Error updating ${game.title}. Please try again.`);
      console.log(error.response?.data?.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleTagChange = (selectedTags) => {
    const updatedTags = selectedTags.map((tag) => ({
      id: tag.id || null,
      name: tag.label || tag.value,
    }));
    const removedTags = originalTags.filter(
      (tag) => !updatedTags.some((updatedTag) => updatedTag.id === tag.id)
    );

    setTags(updatedTags);
    setRemovedTags(removedTags);
  };

  // const handleStarClick = (rating) => {
  //   setGameDetails((prevDetails) => ({ ...prevDetails, rating }));
  // };

  return createPortal(
    <AnimatePresence>
      {modalIsOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-pixelpath-primary to-pixelpath-primary/80 p-6 text-white">
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              <div className="flex items-center space-x-3 pr-12">
                <div className="p-2 bg-white/20 rounded-full">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Edit Game</h2>
                  <p className="text-white/80 text-sm line-clamp-1">{gameDetails.title}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="max-h-[60vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                
                {/* Status Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-800">Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Want To Play", "Playing", "Completed"].map((status) => (
                      <motion.button
                        key={status}
                        type="button"
                        onClick={() => setGameDetails(prev => ({ ...prev, status }))}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          gameDetails.status === status
                            ? 'bg-pixelpath-primary text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {status === "Want To Play" ? "Want to Play" : status}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-800">Rating</label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setGameDetails(prev => ({ ...prev, rating: star }))}
                        className="p-1 transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= gameDetails.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 hover:text-yellow-200'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  {gameDetails.rating > 0 && (
                    <p className="text-center text-sm text-gray-600">
                      {gameDetails.rating}/5 stars
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-800">Notes</label>
                  <textarea
                    name="notes"
                    value={gameDetails.notes}
                    onChange={handleInputChange}
                    placeholder="What did you think of this game?"
                    className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-pixelpath-primary focus:border-transparent transition-all"
                    rows={4}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-800">Tags</label>
                  <Select
                    isMulti
                    name="tags"
                    options={tagOptions}
                    placeholder="Add tags..."
                    value={
                      tags.length > 0
                        ? tags.map((tag) => ({
                            label: tag.name,
                            value: tag.name,
                            id: tag.id,
                          }))
                        : null
                    }
                    onChange={handleTagChange}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#9a7aa0' : '#e5e7eb',
                        borderRadius: '12px',
                        minHeight: '48px',
                        boxShadow: state.isFocused ? '0 0 0 2px rgba(154, 122, 160, 0.2)' : 'none',
                        '&:hover': {
                          borderColor: '#9a7aa0'
                        }
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#f3f0f5',
                        borderRadius: '6px',
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: '#6d5372',
                        fontWeight: '600',
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: '#6d5372',
                        '&:hover': {
                          backgroundColor: '#e8e1ed',
                          color: '#5a445f',
                        },
                      }),
                    }}
                  />
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 p-6 bg-gray-50 border-t border-gray-100">
              <motion.button
                type="button"
                onClick={closeModal}
                className="flex-1 px-4 py-3 text-gray-600 font-semibold rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 px-4 py-3 font-semibold rounded-xl transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-pixelpath-primary text-white hover:bg-pixelpath-primary/90 shadow-lg hover:shadow-xl'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </div>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default GameForm;
