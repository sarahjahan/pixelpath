import { motion } from "framer-motion";
import { ArrowRight, GamepadIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/assets/pixelpath-home-logo.jpg";
import Button from "../../components/ui/Button";

function SigninPage() {
  const navigate = useNavigate();

  return (
    <div className="container-responsive min-h-screen flex items-center justify-center">
      <motion.div 
        className="text-center max-w-4xl mx-auto py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="page-header mb-4 bg-gradient-to-r from-pixelpath-primary to-pixelpath-accent bg-clip-text text-transparent">
            Welcome to PixelPath
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tracking your gaming journey, one pixel at a time!
          </p>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, rotateY: 180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img 
            className="w-60 h-60 lg:w-80 lg:h-80 mx-auto rounded-3xl shadow-cozy-lg object-cover hover:shadow-xl transition-shadow duration-300" 
            src={logo} 
            alt="PixelPath Logo"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="body-text max-w-3xl mx-auto px-4">
            Our platform helps you seamlessly organize, track, and enhance your
            gaming journey. Whether you're curating your Game Library, searching for
            new titles, or looking for personalized recommendations that match your
            mood, PixelPath has you covered.
          </p>
          
          <p className="text-lg font-medium text-pixelpath-primary">
            Join us and transform the way you connect with your games!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/library')}
            className="flex items-center space-x-2 min-w-48"
          >
            <GamepadIcon className="w-5 h-5" />
            <span>View My Library</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/search')}
            className="flex items-center space-x-2 min-w-48"
          >
            <span>Discover Games</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {[
            {
              title: "Game Library",
              description: "Organize and track your gaming collection",
              icon: "📚"
            },
            {
              title: "Mood Recommendations", 
              description: "Find games that match your current mood",
              icon: "🎯"
            },
            {
              title: "Discovery",
              description: "Explore new games and add them to your library",
              icon: "🔍"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="p-6 bg-white rounded-xl shadow-cozy hover:shadow-cozy-lg transition-all duration-300"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="subheader mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SigninPage;
