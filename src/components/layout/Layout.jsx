import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "../ui/MicroInteractions";
import "react-toastify/dist/ReactToastify.css";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

function Layout({ children, className = "" }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <motion.main
        className={`flex-1 ${className}`}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast Container with modern styling */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
        className="!top-20" // Account for navbar height
        toastClassName="!bg-white !text-text-900 !rounded-xl !shadow-cozy-lg !border !border-text-200"
        bodyClassName="!text-sm !font-medium"
        closeButton={({ closeToast }) => (
          <button
            onClick={closeToast}
            className="text-text-400 hover:text-text-600 transition-colors"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default Layout;