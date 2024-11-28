import Card from "../../components/Card/Card"
// import Dropdown from 'react-dropdown';
// import "react-dropdown/style.css";
import Select from 'react-select';
import './GamesLibrary.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../Button/Button'


function GamesLibrary({ gamesList, handleSort, delGame, addGame, getGamesLibrary, gamesAPIList, isSearchPage }) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);

    const filteredGames = (isSearchPage ? gamesAPIList : gamesList).filter((game) => {
        const matchesSearch = game.title?.toLowerCase().includes(searchKeyword.toLowerCase());
        const matchesStatus = statusFilter ? game.status === statusFilter.value : true; // Use `statusFilter.value` to match game status
    
        return matchesSearch && matchesStatus;
});

const navigate = useNavigate()
    

//Code for React Select
  const options = [
    { value: 'Playing', label: 'Playing' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Want To Play', label: 'Want To Play' }
  ]

  const handleStatusChange = (selectedOption) => {
    setStatusFilter(selectedOption);
  };

    if (!gamesList && !gamesAPIList) return <div>Loading games...</div>;


    return(
        <div>
            <div className="gamesList__header">
            {/* <div className="gamesList__filter" onChange={(e) => setFilteredGames(e.target.value)}>Filter</div> */}
            <Select 
                className="gamesList__filter"
                options={options} 
                placeholder={"Filter by Status..."}
                onChange={handleStatusChange}/>


                <div className="gamesList__search">
                    <input
                        className="gamesList__searcher"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Search..."
                        onChange={(e) => setSearchKeyword(e.target.value)}/>
                </div>

                <div className="gamesList__discover-button" onClick={() => navigate('/search')}>Discover New Games</div>

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