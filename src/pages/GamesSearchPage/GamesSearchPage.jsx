import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";
import { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_URL;


function GamesSearchPage() {
    const [gamesAPIList, setGamesAPIList] = useState([]);
    const [gamesList, setGamesList] = useState([]);

    const addGame = async (id, title, coverArt, tags, genres) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/api/games/`, 
        {game_id: id, user_id: 1, title, coverArt, tags, genres}
        );
        setGamesList((prevGamesList) => [...prevGamesList, data]);
        toast.success(`The game you selected was sucessfully added to library. Refreshing Games list.`);
      } catch (error) {
        toast.error(`Error adding game`);
        console.log(error.response?.data || error)
      }
    };

    const delGame = async (id) => {
      try {
        const { data } = await axios.delete(`${BASE_URL}/api/games/${id}`);
        setGamesList(gamesList.filter(game => game.id !== id)); // Remove from state
        toast.success(`The game you selected was removed from your library. Refreshing Games list.`);
      } catch (error) {
        toast.error(`Error deleting game: ${error}`);
        console.log(error.response)
      }
    };

    const getGamesAPI = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/games/search`)
            setGamesAPIList(data);
            console.log(data)
        } catch (error) {
          console.error("Error fetching games", error);
        }
      };

      useEffect(() => {
        getGamesAPI();
      }, [gamesList]);

      if (!gamesAPIList.length === 0) {
        return (
            <div>no games found...</div>
        )}

    return(
      <div>
        <GamesLibrary gamesAPIList={gamesAPIList} isSearchPage={true} addGame={addGame} delGame={delGame} />
      </div>
    )
}


export default GamesSearchPage