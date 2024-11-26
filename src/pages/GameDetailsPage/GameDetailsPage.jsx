import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function GameDetailsPage() {
    const id = useParams();

    const getGameDetails = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/games/${id}`);
            console.log(data)
            console.log("Client side confirmed");
        } catch (error) {
          console.error(`Error fetching game with ${id}`, error);
        }
      };

      useEffect(() => {
        getGameDetails();
      }, []);

    //   if (!gamesAPIList.length === 0) {
    //     return (
    //         <div>no games found...</div>
    //     )}


    return(
        <>Game Details </>
        
    )
}


export default GameDetailsPage