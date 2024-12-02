import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

function LibraryPage() {
  const [gamesList, setGamesList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);

  const delGame = async (id) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/games/${id}`);
      setGamesList(gamesList.filter((game) => game.id !== id));
      toast.success(
        `The game you selected was removed from your library. Games list refreshed.`
      );
    } catch (error) {
      toast.error(`Error deleting game: ${error}`);
      console.log(error.response);
    }
  };

  const getGamesLibrary = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/games`, {});
      setGamesList(data);
      setFilteredGames(data);
      console.log(data);
      console.log("Client side confirmed");
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  useEffect(() => {
    getGamesLibrary();
  }, []);

  const handleSort = async (sortBy = "title" || "status" || "rating") => {
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
    return <div>no games found...</div>;
  }

  return (
    <div>
      <GamesLibrary
        isSearchPage={false}
        gamesList={gamesList}
        handleSort={handleSort}
        delGame={delGame}
        getGamesLibrary={getGamesLibrary}
      />
    </div>
  );
}

export default LibraryPage;
