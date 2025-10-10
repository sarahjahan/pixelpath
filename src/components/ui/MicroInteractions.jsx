import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import clsx from "clsx";

// Scroll to top button component
export function ScrollToTop({ className = "" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-6 right-6 z-50 p-3 bg-pixelpath-primary text-white rounded-full shadow-cozy-lg",
        "hover:bg-pixelpath-primary/90 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-pixelpath-primary focus:ring-offset-2",
        className
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <ChevronUp className="w-5 h-5" />
    </motion.button>
  );
}

// Enhanced hover card wrapper
export function HoverCard({ 
  children, 
  className = "", 
  hoverScale = 1.02, 
  tapScale = 0.98,
  ...props 
}) {
  return (
    <motion.div
      className={clsx("cursor-pointer", className)}
      whileHover={{ 
        scale: hoverScale,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: tapScale }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Floating action button with tooltip
export function FloatingActionButton({
  children,
  onClick,
  tooltip,
  position = "bottom-right",
  className = "",
  ...props
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <motion.div
      className={clsx("fixed z-50", positionClasses[position], className)}
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {tooltip && (
        <motion.div
          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: showTooltip ? 1 : 0, 
            y: showTooltip ? 0 : 10 
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </motion.div>
      )}

      {/* Button */}
      <motion.button
        onClick={onClick}
        className="p-4 bg-pixelpath-primary text-white rounded-full shadow-cozy-lg hover:shadow-xl transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-pixelpath-primary focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

// Page loading overlay
export function PageLoader({ isLoading, message = "Loading..." }) {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-pixelpath-primary/20 border-t-pixelpath-primary rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-pixelpath-text font-medium">{message}</p>
      </div>
    </motion.div>
  );
}

// Animated counter component
export function AnimatedCounter({ 
  value, 
  duration = 1, 
  className = "",
  prefix = "",
  suffix = "" 
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setDisplayValue(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}

// Stagger container for list animations
export function StaggerContainer({ children, className = "", delay = 0.1 }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

// Stagger item for individual elements
export function StaggerItem({ children, className = "" }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}

export default ScrollToTop;