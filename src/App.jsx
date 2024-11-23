import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import SigninPage from './pages/SigninPage/SigninPage'
import LibraryPage from '../src/pages/LibraryPage/LibraryPage'
import GamesSearchPage from './pages/GamesSearchPage/GamesSearchPage'
import GameDetailsPage from './pages/GameDetailsPage/GameDetailsPage'


import { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'
import Button from './components/Button/Button'
import Navbar from './components/Navbar/Navbar'
import Card from './components/Card/Card'

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [gamesList, setGamesList] = useState([])

  console.log(gamesList);


  const getGamesAPI = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/games`);
        setGamesList(data)
        console.log(data)
        console.log("Client side confirmed");
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  useEffect(() => {
    getGamesAPI();
  }, []);

  if (gamesList.length === 0) {
    return <div>no games found...</div>
  }

  return (
    <>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SigninPage />}/>
        <Route path="/library" element={<LibraryPage gamesList={gamesList}/>} />
        <Route path="/details" element={<GameDetailsPage />} />
        <Route path="/search" element={<GamesSearchPage />} />
        <Route path="/mood" />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
      </BrowserRouter>       
    </>
  )
}

export default App
