import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import backicon from '../../public/assets/icons/arrow-left.svg'

const BASE_URL = import.meta.env.VITE_API_URL;


function GamesSearchPage() {
    const [gamesAPIList, setGamesAPIList] = useState([]);



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
        <Link to="/library">
          <img className="icon" src={backicon}/>
        </Link>
        <GamesLibrary gamesAPIList={gamesAPIList} isSearchPage={true} />
      </div>
    )
}


export default GamesSearchPage