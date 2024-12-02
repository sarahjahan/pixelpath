import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import SigninPage from './pages/SigninPage/SigninPage'
import LibraryPage from '../src/pages/LibraryPage/LibraryPage'
import GamesSearchPage from './pages/GamesSearchPage/GamesSearchPage'
import GameDetailsPage from './pages/GameDetailsPage/GameDetailsPage'
import './App.scss'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SigninPage />}/>
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/details/:gameid" element={<GameDetailsPage />} />
        <Route path="/search" element={<GamesSearchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </BrowserRouter>       
  )
}

export default App
