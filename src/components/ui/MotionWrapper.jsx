import { motion } from "framer-motion";

// Predefined animation variants
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

// Default transition settings
export const defaultTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.3,
};

function MotionWrapper({
  children,
  variant = "fadeIn",
  delay = 0,
  duration = 0.3,
  className = "",
  customVariants = null,
  transition = defaultTransition,
  ...props
}) {
  const variants = customVariants || animationVariants[variant];
  
  const motionTransition = {
    ...transition,
    duration,
    delay,
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={motionTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Specialized motion components for common use cases
export function MotionCard({ children, className = "", delay = 0, ...props }) {
  return (
    <MotionWrapper
      variant="scaleIn"
      delay={delay}
      className={`card ${className}`}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </MotionWrapper>
  );
}

export function MotionGrid({ children, className = "", ...props }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={animationVariants.staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionGridItem({ children, className = "", ...props }) {
  return (
    <motion.div
      variants={animationVariants.staggerItem}
      transition={defaultTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default MotionWrapper;