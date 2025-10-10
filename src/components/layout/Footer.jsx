import { motion } from "framer-motion";
import { Heart, Github, Gamepad2 } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-white border-t border-gray-200 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Gamepad2 className="w-8 h-8 text-pixelpath-primary mr-2" />
              <h3 className="text-xl font-bold text-pixelpath-text">PixelPath</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your gaming journey tracker. Organize, discover, and enjoy games that match your mood.
            </p>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-pixelpath-text mb-4">Features</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Game Library Management</li>
              <li>Mood-Based Recommendations</li>
              <li>Personal Notes & Ratings</li>
              <li>Game Discovery</li>
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold text-pixelpath-text mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <motion.a
                href="https://github.com/sarahjahan/pixelpath"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-pixelpath-primary transition-colors rounded-lg hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
            <p className="text-sm text-gray-500">
              Open source gaming tracker
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-200 pt-8 mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 flex items-center justify-center">
            Made with{" "}
            <motion.span 
              className="mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.span>{" "}
            for gamers • © {currentYear} PixelPath
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;