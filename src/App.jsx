import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import SigninPage from './pages/SigninPage/SigninPage'
import LibraryPage from '../src/pages/LibraryPage/LibraryPage'
import GamesSearchPage from './pages/GamesSearchPage/GamesSearch'

import { useEffect } from 'react'
import axios from "axios";
import './App.css'
import Button from './components/Button/Button'

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {

  const getGamesAPI = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/games`);
      console.log("Client side confirmed");
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  useEffect(() => {
    getGamesAPI();
  }, []);

  return (
    <>
      <Button onClick={getGamesAPI}/>

      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SigninPage />}/>
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/search" element={<GamesSearchPage />} />
        <Route path="/mood" />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
      </BrowserRouter>       
    </>
  )
}

export default App
