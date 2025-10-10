import { motion } from "framer-motion";
import { Heart, Github, Gamepad2 } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gradient-to-br from-pixelpath-primary/5 to-pixelpath-secondary/5 border-t border-pixelpath-primary/10 mt-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-pixelpath-primary"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-pixelpath-secondary"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-pixelpath-accent"></div>
      </div>

      <div className="container-responsive py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center md:justify-start mb-6">
              <motion.div 
                className="p-3 bg-white rounded-xl shadow-cozy mr-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Gamepad2 className="w-8 h-8 text-pixelpath-primary" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-pixelpath-text">PixelPath</h3>
                <p className="text-sm text-pixelpath-primary font-medium">Gaming Journey Tracker</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-sm mx-auto md:mx-0">
              Organize, discover, and enjoy games that perfectly match your mood. Your personal gaming companion for every adventure.
            </p>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-pixelpath-text mb-6 text-lg">Key Features</h4>
            <div className="space-y-3">
              {[
                { icon: "📚", text: "Game Library Management" },
                { icon: "🎯", text: "Mood-Based Recommendations" },
                { icon: "⭐", text: "Personal Notes & Ratings" },
                { icon: "🔍", text: "Smart Game Discovery" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center space-x-2 text-gray-700"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg">{feature.icon}</span>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-bold text-pixelpath-text mb-6 text-lg">Connect & Contribute</h4>
            <div className="flex justify-center md:justify-end space-x-3 mb-6">
              <motion.a
                href="https://github.com/sarahjahan/pixelpath"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white rounded-xl shadow-cozy hover:shadow-cozy-lg transition-all duration-300 border border-transparent hover:border-pixelpath-primary/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-6 h-6 text-gray-600 group-hover:text-pixelpath-primary transition-colors" />
              </motion.a>
            </div>
            <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-sm text-gray-700 font-medium mb-1">
                Open Source Project
              </p>
              <p className="text-xs text-gray-600">
                Built with React, Tailwind CSS & Framer Motion
              </p>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          className="border-t border-pixelpath-primary/10 pt-8 mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/70 rounded-2xl p-6 backdrop-blur-sm shadow-cozy max-w-md mx-auto">
            <p className="text-gray-700 flex items-center justify-center font-medium">
              Crafted with{" "}
              <motion.span 
                className="mx-2"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Heart className="w-5 h-5 text-red-500 fill-current drop-shadow-sm" />
              </motion.span>{" "}
              for the gaming community
            </p>
            <p className="text-sm text-gray-600 mt-2">
              © {currentYear} PixelPath • Level up your gaming experience
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;