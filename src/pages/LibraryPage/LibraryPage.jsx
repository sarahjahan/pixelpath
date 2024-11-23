import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";
import { useEffect, useState } from 'react'
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


function LibraryPage() {
    const [gamesList, setGamesList] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);



    const getGamesLibrary = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/games`, {
            // params: { filter: selectedFilter, sort: selectedSort }
          });
            setGamesList(data);
            setFilteredGames(data);
            console.log(data)
            console.log("Client side confirmed");
        } catch (error) {
          console.error("Error fetching games", error);
        }
      };

      // useEffect(() => {
      //   setGamesList(gamesList);
    
      //   const lowerCaseKey = searchKeyword.toLowerCase();
    
      //   setFilteredGames(
      //     gamesList.filter((game) =>
      //       Object.keys(game).filter((key) => key !== 'id').some((field) =>
      //         game[field]?.toString().toLowerCase().includes(lowerCaseKey)
      //       )
      //     )
      //   );
      // }, [searchKeyword,gamesList]);
    
      useEffect(() => {
        getGamesLibrary();
      }, []);

    const handleSort = async (
        sortBy = "title" || "status" || "rating") => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/games/`, {
            params: { sortBy, order: sortOrder },
          });
          setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
          setGamesList(data);
        } catch (error) {
          console.error("Error getting warehouse data from API call", error);
        }
      };


    if (!gamesList.length === 0) {
        return (
            <div>no games found...</div>
        )}

    return(
        <div>
            <GamesLibrary gamesList={gamesList} handleSort={handleSort} handleSearch={setSearchKeyword} />
        </div>
       
    )
}


export default LibraryPage;