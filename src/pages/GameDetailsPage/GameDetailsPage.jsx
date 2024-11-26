import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import GameDetails from '../../components/GameDetails/GameDetails'
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function GameDetailsPage() {
  const [gameDetails, setGameDetails] = useState([]);

    const id = useParams();
    console.log(id)

    const { gameid } = id 
    console.log(gameid)

    const getGameDetails = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/games/${gameid}`);
            console.log(data);
            setGameDetails(data[0]);
            console.log("Client side confirmed");
        } catch (error) {
          console.error(`Error fetching game with ${id}`, error);
        }
      };

      useEffect(() => {
        getGameDetails();
      }, []);

    return(
        <>
        <GameDetails gameDetails={gameDetails}/>
        </>
        
    )
}


export default GameDetailsPage;