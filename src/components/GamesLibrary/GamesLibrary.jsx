import Card from "../../components/Card/Card"
import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";


import './GamesLibrary.scss'
import { useState } from 'react'


function GamesLibrary({ gamesList, handleSort }) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);

    // const [{ id, title, summary, coverArt, status, notes, rating }] = gamesList
    // console.log(gamesList)
    // console.log(title)

    return(
        <div>

            <div className="gamesList__header">
                <div className="gamesList__sorter"onClick={() => handleSort("title")} >Sort</div>
                <div className="gamesList__filter" onChange={(e) => setFilteredGames(e.target.value)}>Filter</div>
                
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
                {gamesList.length > 0 &&
                gamesList.map((game, index) => (
                    <Card key={index} title={game.title} summary={game.summary} status={game.status} rating={game.rating} tags={game.tags} imgURL={game.coverArt}/>
                ))}
            </div>

        </div>
       
    )
}


export default GamesLibrary;