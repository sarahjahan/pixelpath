import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const logo = "/assets/controller.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/library", label: "Library" },
    { path: "/search", label: "Search" },
  ];

  return (
    <motion.nav 
      className="bg-pixelpath-primary border-b border-gray-200 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white font-semibold transition-colors duration-200 hover:text-pixelpath-secondary ${
                  location.pathname === item.path ? 'text-pixelpath-secondary' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/library')}
          >
            <img
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-lg"
              src={logo}
              alt="PixelPath"
            />
          </motion.div>

          {/* Discover Button */}
          <Link 
            to="/search" 
            className="bg-white text-pixelpath-text px-4 py-2 rounded-lg font-semibold 
                     border border-gray-200 transition-all duration-200
                     hover:bg-pixelpath-secondary hover:shadow-cozy
                     focus:outline-none focus:ring-2 focus:ring-pixelpath-secondary focus:ring-offset-2"
          >
            Discover Games
          </Link>
        </div>

        {/* Mobile Menu - Simple for now, can be enhanced later */}
        <div className="md:hidden flex justify-center space-x-6 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-white text-sm font-semibold transition-colors duration-200 hover:text-pixelpath-secondary ${
                location.pathname === item.path ? 'text-pixelpath-secondary' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
