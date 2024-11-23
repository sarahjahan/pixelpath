import Card from "../../components/Card/Card"
import './GamesLibrary.scss'
import { useState } from 'react'


function GamesLibrary({gamesList}) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");


    const [{ id, title, summary, coverArt, status, notes }] = gamesList
    console.log(gamesList)
    console.log(title)

    return(
        <div>

            <div className="gamesList__header">
                <div className="gamesList__sorter">Sort</div>
                <div className="gamesList__filter">Filter</div>
                
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
                    <Card key={index} title={game.title} genre={game.summary} imgURL={game.coverArt}/>
                ))}
            </div>

        </div>
       
    )
}


export default GamesLibrary;