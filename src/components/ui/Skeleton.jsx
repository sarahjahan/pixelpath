import { motion } from "framer-motion";
import clsx from "clsx";

// Base skeleton component
function Skeleton({ className = "", height = "h-4", width = "w-full", ...props }) {
  return (
    <motion.div
      className={clsx(
        "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md animate-pulse",
        height,
        width,
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  );
}

// Card skeleton for game cards
export function CardSkeleton({ className = "" }) {
  return (
    <motion.div
      className={clsx(
        "bg-white rounded-xl p-4 shadow-cozy border border-gray-200 w-full md:w-80 lg:w-72",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Status badge skeleton */}
        <Skeleton height="h-5" width="w-20" className="self-start" />
        
        {/* Divider */}
        <div className="w-full h-px bg-gray-200"></div>
        
        {/* Cover art skeleton */}
        <Skeleton height="h-52" width="w-40" className="rounded-lg" />
        
        {/* Title skeleton */}
        <Skeleton height="h-6" width="w-32" />
        
        {/* Rating skeleton */}
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} height="h-4" width="w-4" className="rounded-full" />
          ))}
        </div>
        
        {/* Notes skeleton */}
        <div className="space-y-2 w-full">
          <Skeleton height="h-3" width="w-full" />
          <Skeleton height="h-3" width="w-3/4" />
        </div>
      </div>
      
      {/* Action buttons skeleton */}
      <div className="flex justify-center space-x-3 mt-4 pt-3 border-t border-gray-100">
        <Skeleton height="h-8" width="w-8" className="rounded-lg" />
        <Skeleton height="h-8" width="w-8" className="rounded-lg" />
      </div>
    </motion.div>
  );
}

// Grid skeleton for game library
export function GridSkeleton({ count = 6, className = "" }) {
  return (
    <motion.div
      className={clsx("flex flex-wrap justify-center gap-4 mt-8 px-4", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, staggerChildren: 0.1 }}
    >
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <CardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Game details skeleton
export function GameDetailsSkeleton({ className = "" }) {
  return (
    <div className={clsx("container-responsive py-8", className)}>
      {/* Back button skeleton */}
      <motion.div
        className="flex items-center space-x-2 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Skeleton height="h-5" width="w-5" className="rounded-full" />
        <Skeleton height="h-5" width="w-24" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Left column - Cover & main info */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-cozy text-center space-y-6">
            {/* Cover art skeleton */}
            <Skeleton height="h-80" width="w-full max-w-xs mx-auto" className="rounded-xl" />
            
            {/* Title skeleton */}
            <div className="space-y-2">
              <Skeleton height="h-8" width="w-48 mx-auto" />
              <Skeleton height="h-6" width="w-32 mx-auto" />
            </div>
            
            {/* Status badge skeleton */}
            <Skeleton height="h-6" width="w-24 mx-auto" className="rounded-full" />
            
            {/* Rating skeleton */}
            <div className="space-y-2">
              <div className="flex justify-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton key={i} height="h-5" width="w-5" className="rounded-full" />
                ))}
              </div>
              <Skeleton height="h-4" width="w-16 mx-auto" />
            </div>
          </div>
        </motion.div>

        {/* Right column - Details */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Summary section */}
          <div className="bg-white rounded-2xl p-6 shadow-cozy space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Skeleton height="h-5" width="w-5" className="rounded-full" />
              <Skeleton height="h-6" width="w-32" />
            </div>
            <div className="space-y-3">
              <Skeleton height="h-4" width="w-full" />
              <Skeleton height="h-4" width="w-full" />
              <Skeleton height="h-4" width="w-3/4" />
            </div>
          </div>

          {/* Notes section */}
          <div className="bg-white rounded-2xl p-6 shadow-cozy space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Skeleton height="h-5" width="w-5" className="rounded-full" />
              <Skeleton height="h-6" width="w-24" />
            </div>
            <div className="bg-pixelpath-bg rounded-lg p-4 space-y-2">
              <Skeleton height="h-4" width="w-full" />
              <Skeleton height="h-4" width="w-5/6" />
            </div>
          </div>

          {/* Tags section */}
          <div className="bg-white rounded-2xl p-6 shadow-cozy space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Skeleton height="h-5" width="w-5" className="rounded-full" />
              <Skeleton height="h-6" width="w-16" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} height="h-6" width="w-16" className="rounded-full" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Page header skeleton
export function PageHeaderSkeleton({ className = "" }) {
  return (
    <div className={clsx("bg-gradient-to-r from-gray-300 to-gray-400 py-12", className)}>
      <div className="container-responsive">
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 md:mb-0 space-y-4">
            <div className="flex items-center space-x-3">
              <Skeleton height="h-8" width="w-8" className="rounded-full bg-white/20" />
              <Skeleton height="h-8" width="w-48" className="bg-white/20" />
            </div>
            <Skeleton height="h-5" width="w-32" className="bg-white/20" />
          </div>
          
          <Skeleton height="h-11" width="w-36" className="rounded-xl bg-white/20" />
        </motion.div>
      </div>
    </div>
  );
}

// List item skeleton
export function ListItemSkeleton({ className = "" }) {
  return (
    <div className={clsx("flex items-center space-x-4 p-4 bg-white rounded-lg border", className)}>
      <Skeleton height="h-12" width="w-12" className="rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton height="h-5" width="w-3/4" />
        <Skeleton height="h-4" width="w-1/2" />
      </div>
      <Skeleton height="h-8" width="w-8" className="rounded-lg" />
    </div>
  );
}

export default Skeleton;