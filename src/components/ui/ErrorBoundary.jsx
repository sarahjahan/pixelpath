import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to your error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          {...this.props}
        />
      );
    }

    return this.props.children;
  }
}

// Main error fallback component
function ErrorFallback({ 
  error, 
  errorInfo, 
  resetError, 
  title = "Something went wrong",
  showDetails = false,
  showHomeButton = true,
  className = ""
}) {
  const navigate = useNavigate();

  const handleRetry = () => {
    resetError();
    window.location.reload();
  };

  const handleGoHome = () => {
    resetError();
    navigate('/');
  };

  const handleGoBack = () => {
    resetError();
    navigate(-1);
  };

  return (
    <div className={`min-h-screen bg-pixelpath-bg flex items-center justify-center p-4 ${className}`}>
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl p-8 shadow-cozy-lg">
          {/* Error Icon */}
          <motion.div
            className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <AlertCircle className="w-10 h-10 text-red-500" />
          </motion.div>

          {/* Error Title */}
          <motion.h1
            className="text-2xl font-semibold text-pixelpath-text mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h1>

          {/* Error Message */}
          <motion.p
            className="text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            We encountered an unexpected error. This has been logged and our team will look into it.
            You can try refreshing the page or returning to the home page.
          </motion.p>

          {/* Error Details (Development Mode) */}
          {showDetails && error && (
            <motion.details
              className="text-left mb-6 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <summary className="cursor-pointer font-medium text-sm text-gray-700 mb-2">
                Technical Details
              </summary>
              <pre className="text-xs text-red-600 overflow-auto max-h-40">
                {error.toString()}
                {errorInfo?.componentStack}
              </pre>
            </motion.details>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              variant="primary"
              onClick={handleRetry}
              className="flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>

            <Button
              variant="subtle"
              onClick={handleGoBack}
              className="flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>

            {showHomeButton && (
              <Button
                variant="secondary"
                onClick={handleGoHome}
                className="flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Simpler error component for inline errors
export function InlineError({ 
  error, 
  retry, 
  canRetry = true, 
  className = "",
  title = "Something went wrong",
  message,
}) {
  return (
    <motion.div
      className={`text-center py-8 px-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        
        <h3 className="text-lg font-semibold text-pixelpath-text mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message || error?.message || "An unexpected error occurred"}
        </p>
        
        {canRetry && retry && (
          <Button
            variant="primary"
            onClick={retry}
            className="flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// Network error component
export function NetworkError({ retry, canRetry = true, className = "" }) {
  return (
    <InlineError
      title="Connection Problem"
      message="We're having trouble connecting to our servers. Please check your internet connection and try again."
      retry={retry}
      canRetry={canRetry}
      className={className}
    />
  );
}

// Not found error component
export function NotFoundError({ onGoBack, onGoHome, className = "" }) {
  return (
    <motion.div
      className={`text-center py-16 px-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-6">🎮</div>
        
        <h3 className="text-2xl font-semibold text-pixelpath-text mb-4">
          Page Not Found
        </h3>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onGoBack && (
            <Button
              variant="subtle"
              onClick={onGoBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>
          )}
          
          {onGoHome && (
            <Button
              variant="primary"
              onClick={onGoHome}
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Go Home</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ErrorBoundary;