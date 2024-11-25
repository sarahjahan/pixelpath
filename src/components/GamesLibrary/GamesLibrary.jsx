import Card from "../../components/Card/Card"
import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";


import './GamesLibrary.scss'
import { useState, useEffect } from 'react'


function GamesLibrary({ gamesList, handleSort, delGame, addGame, getGamesLibrary, gamesAPIList, isSearchPage }) {
    const [searchKeyword, setSearchKeyword] = useState("");

    const filteredGames = (isSearchPage ? gamesAPIList : gamesList).filter((game) =>
      game.title?.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    if (!gamesList && !gamesAPIList) return <div>Loading games...</div>;


    return(
        <div>
            <div className="gamesList__header">
                <div className="gamesList__sorter"onClick={() => handleSort("title")}>Sort by Title</div>
                {/* <div className="gamesList__filter" onChange={(e) => setFilteredGames(e.target.value)}>Filter</div> */}
                
                <div className="gamesList__search">
                    <input
                        className="gamesList__searcher"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Search..."
                        onChange={(e) => setSearchKeyword(e.target.value)}/>
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