import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import SigninPage from "./pages/SigninPage/SigninPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import GamesSearchPage from "./pages/GamesSearchPage/GamesSearchPage";
import GameDetailsPage from "./pages/GameDetailsPage/GameDetailsPage";
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary showDetails={import.meta.env.DEV}>
      <BrowserRouter>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<SigninPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/details/:gameid" element={<GameDetailsPage />} />
              <Route path="/search" element={<GamesSearchPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
