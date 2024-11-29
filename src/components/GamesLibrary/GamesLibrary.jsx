import Card from "../../components/Card/Card"
import Select from 'react-select';
import './GamesLibrary.scss'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../Button/Button'
import MoodReco from "../MoodReco/MoodReco";


function GamesLibrary({ gamesList, handleSort, delGame, addGame, getGamesLibrary, gamesAPIList, isSearchPage }) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [genreFilter, setGenreFilter] = useState(null);

    const filteredGames = (isSearchPage ? gamesAPIList : gamesList).filter((game) => {
        const matchesSearch = game.title?.toLowerCase().includes(searchKeyword.toLowerCase());
        const matchesStatus = statusFilter ? (statusFilter.value === null || game.status === statusFilter.value) : true;        const matchesGenre = genreFilter
    ? game.genres?.toLowerCase().split(',').some(genre => genre.trim() === genreFilter.value.toLowerCase()) 
    : true;

    
        return matchesSearch && matchesStatus && matchesGenre;
});

const navigate = useNavigate()
    

//Code for React Select
  const statusOptions = [
    { value: null, label: 'All Statuses' },
    { value: 'Playing', label: 'Playing' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Want To Play', label: 'Want To Play' }
  ]

  const genreOptions = [
    { value: 'Puzzle', label:'Puzzle',},
    { value: 'Shooter', label: 'Shooter' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Action', label: 'Action' }
  ]

  const handleStatusChange = (selectedOption) => {
    setStatusFilter(selectedOption);
  };

    if (!gamesList && !gamesAPIList) return <div>Loading games...</div>;


    return(
        <div>
            
            {isSearchPage ? null : <MoodReco />}
            
            <div className="gamesList__header">
                <div className="gamesList__search">
                    <input
                        className="gamesList__searcher"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Search..."
                        onChange={(e) => setSearchKeyword(e.target.value)}/>
                </div>


                {isSearchPage ? (
                <Select 
                className="gamesList__filter"
                options={genreOptions} 
                placeholder={"Filter by Genre..."}
                onChange={handleStatusChange}/>
                ) : (
                <Select 
                className="gamesList__filter"
                options={statusOptions} 
                placeholder={"Filter by Status..."}
                onChange={handleStatusChange}/> )}


                <div className="gamesList__sort-button">
                    <p>Sort By:</p>
                    <Button className="gamesList__sorter"onClick={() => handleSort("title")} actiontext={"Title"}/>
                    <Button className="gamesList__sorter"onClick={() => handleSort("rating")} actiontext={"Rating"}/>
                    <Button className="gamesList__sorter"onClick={() => handleSort("status")} actiontext={"Status"}/>
                </div>
            </div>
            
            <div className="gamesList__container">
                {filteredGames.length ===0? (<p className="result-message">No results found.</p>):
                filteredGames.map((game, index) => (
                    <Card key={game.id}
                    game={game} 
                    gameid={game.id} 
                    title={game.title} 
                    delGame={delGame}
                    addGame={addGame} 
                    getGamesLibrary={getGamesLibrary}
                    isSearchPage={isSearchPage} />
                ))}
            </div>
        </div>
       
    )
}


export default GamesLibrary;