import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import themeToMoodMap from '../utils/themeToMoodMap';

/**
 * Debounce hook for performance optimization
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Throttle hook to limit function calls
 */
export function useThrottle(callback, delay) {
  const throttleTimer = useRef(null);
  const lastRan = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRan.current >= delay) {
      callback(...args);
      lastRan.current = Date.now();
    } else {
      clearTimeout(throttleTimer.current);
      throttleTimer.current = setTimeout(() => {
        if (Date.now() - lastRan.current >= delay) {
          callback(...args);
          lastRan.current = Date.now();
        }
      }, delay - (Date.now() - lastRan.current));
    }
  }, [callback, delay]);
}

/**
 * Memoized filter function for game lists
 */
export function useGameFilter(games, searchKeyword, statusFilter, genreFilter, moodFilter) {
  return useMemo(() => {
    if (!games || games.length === 0) return [];

    return games.filter((game) => {
      // Search keyword filter
      const matchesSearch = !searchKeyword || 
        game.title?.toLowerCase().includes(searchKeyword.toLowerCase());

      // Status filter
      const matchesStatus = !statusFilter || 
        statusFilter.value === null || 
        game.status === statusFilter.value;

      // Genre filter
      const matchesGenre = !genreFilter?.value || 
        game.tags?.split(",")
          .map((tag) => tag.trim().toLowerCase())
          .some((tag) => tag === genreFilter.value.toLowerCase());

      // Mood filter
      const matchesMood = !moodFilter || 
        game.tags?.some((tag) => {
          const tagName = typeof tag === "string" ? tag : tag.name;
          return themeToMoodMap[tagName] === moodFilter;
        });

      return matchesSearch && matchesStatus && matchesGenre && matchesMood;
    });
  }, [games, searchKeyword, statusFilter, genreFilter, moodFilter]);
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
}

/**
 * Local storage hook with JSON serialization
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Previous value hook for comparison
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * Window size hook for responsive design
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

/**
 * Image preloader hook for performance
 */
export function useImagePreloader(imageUrls) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
      });
    };

    const loadAllImages = async () => {
      try {
        const promises = imageUrls.map(loadImage);
        const results = await Promise.allSettled(promises);
        
        const loaded = new Set();
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            loaded.add(imageUrls[index]);
          }
        });
        
        setLoadedImages(loaded);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      }
    };

    loadAllImages();
  }, [imageUrls]);

  return { imagesLoaded, loadedImages };
}

/**
 * Scroll position hook
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}

export default useDebounce;