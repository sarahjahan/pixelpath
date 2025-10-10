import { motion } from "framer-motion";
import clsx from "clsx";

const buttonVariants = {
  primary: "btn-primary",
  secondary: "btn-secondary", 
  subtle: "btn-subtle",
};

const sizeVariants = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const classes = clsx(
    baseClasses,
    buttonVariants[variant],
    sizeVariants[size],
    {
      "opacity-50 cursor-not-allowed": disabled,
      "hover:transform hover:scale-105": !disabled,
    },
    className
  );

  return (
    <motion.button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;