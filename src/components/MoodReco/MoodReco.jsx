import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
const angry = "/assets/angry.png";
const chill = "/assets/chill.png";
const happy = "/assets/happy.png";
import clsx from "clsx";

const moods = [
  {
    id: "relaxed",
    name: "Relaxed",
    image: chill,
    color: "from-green-400 to-blue-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    description: "Chill games for peaceful moments"
  },
  {
    id: "happy",
    name: "Happy", 
    image: happy,
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    description: "Fun games to boost your mood"
  },
  {
    id: "competitive",
    name: "Competitive",
    image: angry,
    color: "from-red-400 to-pink-500", 
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    description: "Challenging games for intense play"
  }
];

function MoodReco({ setMoodFilter, selectedMood, setSelectedMood }) {
  const handleMoodClick = (mood) => {
    setMoodFilter(mood);
    setSelectedMood(mood);
  };

  const clearMoodFilter = () => {
    setMoodFilter(null);
    setSelectedMood(null);
  };

  return (
    <motion.div 
      className="text-center py-12 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-pixelpath-primary mr-2" />
          <h2 className="page-header bg-gradient-to-r from-pixelpath-primary to-pixelpath-accent bg-clip-text text-transparent">
            How are you feeling?
          </h2>
          <Sparkles className="w-6 h-6 text-pixelpath-primary ml-2" />
        </div>
        <p className="text-gray-600 mb-4">
          Choose a mood to discover games that match your vibe
        </p>
        
        {/* Clear Filter Button */}
        {selectedMood && (
          <motion.button
            onClick={clearMoodFilter}
            className="inline-flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4 mr-1" />
            Clear mood filter
          </motion.button>
        )}
      </motion.div>

      {/* Mood Options */}
      <motion.div 
        className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        {moods.map((mood, index) => {
          const isSelected = selectedMood === mood.id;
          const isUnselected = selectedMood && selectedMood !== mood.id;
          
          return (
            <motion.div
              key={mood.id}
              className={clsx(
                "relative cursor-pointer group transition-all duration-300",
                isUnselected && "opacity-40 scale-95"
              )}
              initial={{ opacity: 0, y: 50, rotateY: -30 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateY: 0,
                scale: isSelected ? 1.05 : 1
              }}
              transition={{ 
                delay: index * 0.1 + 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ 
                y: -8, 
                scale: isSelected ? 1.05 : 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodClick(mood.id)}
            >
              {/* Background Glow */}
              <motion.div
                className={clsx(
                  "absolute inset-0 bg-gradient-to-br rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                  mood.color
                )}
                animate={{
                  opacity: isSelected ? 0.3 : 0,
                }}
              />
              
              {/* Card */}
              <div className={clsx(
                "relative bg-white rounded-2xl p-6 shadow-cozy hover:shadow-cozy-lg transition-all duration-300",
                isSelected 
                  ? `bg-gradient-to-br ${mood.color} text-white` 
                  : "hover:shadow-xl"
              )}>
                {/* Image Container */}
                <motion.div
                  className="relative mb-4 mx-auto w-24 h-24 lg:w-32 lg:h-32 overflow-hidden rounded-xl"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.img
                    src={mood.image}
                    alt={mood.name}
                    className="w-full h-full object-cover rounded-xl"
                    style={{ 
                      background: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                    animate={{
                      filter: isUnselected ? "grayscale(100%)" : "grayscale(0%)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Selection Ring */}
                  {isSelected && (
                    <motion.div
                      className="absolute -inset-2 rounded-xl border-3 border-white opacity-80"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    />
                  )}
                </motion.div>

                {/* Content */}
                <div className="text-center">
                  <h3 className={clsx(
                    "font-semibold text-lg mb-2 transition-colors",
                    isSelected ? "text-white" : "text-pixelpath-text"
                  )}>
                    {mood.name}
                  </h3>
                  <p className={clsx(
                    "text-sm transition-colors",
                    isSelected ? "text-white/90" : "text-gray-600"
                  )}>
                    {mood.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    className="absolute top-3 right-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Selected Mood Info */}
      {selectedMood && (
        <motion.div
          className="mt-8 p-4 bg-white rounded-xl shadow-cozy max-w-md mx-auto"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <p className="text-pixelpath-text font-medium">
            🎮 Showing games perfect for your <span className="text-pixelpath-primary font-semibold">{selectedMood}</span> mood
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default MoodReco;
