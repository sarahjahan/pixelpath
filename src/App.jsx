import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import SigninPage from './pages/SigninPage/SigninPage'
import LibraryPage from '../src/pages/LibraryPage/LibraryPage'
import GamesSearchPage from './pages/GamesSearchPage/GamesSearch'

import { useState } from 'react'
import './App.css'
import Button from './components/Button/Button'

function App() {

  return (
    <>
      <Button />

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
