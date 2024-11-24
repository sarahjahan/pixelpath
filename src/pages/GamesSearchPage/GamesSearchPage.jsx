import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";
import { useEffect, useState } from 'react'
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


function GamesSearchPage() {
    const [gamesAPIList, setGamesAPIList] = useState([]);
    const [gamesList, setGamesList] = useState([]);

    // const [sortOrder, setSortOrder] = useState("asc");

    const addGame = async (title, coverArt) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/api/games/`, 
        {user_id: 1, title, coverArt}
        );
        setGamesList(gamesList.push(game => game.id === id)); // Add to state
        alert(`Game was sucessfully added to library. Refreshing Games list.`);
      } catch (error) {
        alert(`Error adding game with id`);
        console.log(error)
      }
    };


    const getGamesAPI = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/games/search`)
            // params: { filter: selectedFilter, sort: selectedSort });
            setGamesAPIList(data);
            // setFilteredGames(data);
            console.log(data)
            console.log("Client side confirmed");
        } catch (error) {
          console.error("Error fetching games", error);
        }
      };

      useEffect(() => {
        getGamesAPI();
      }, []);

      if (!gamesAPIList.length === 0) {
        return (
            <div>no games found...</div>
        )}

      
    
    return(
      <div>
        <GamesLibrary gamesAPIList={gamesAPIList} isSearchPage={true} addGame={addGame} setGamesList={setGamesList} />
      </div>
    )
}


export default GamesSearchPage