import Card from "../../components/Card/Card"
import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";


import './GamesLibrary.scss'
import { useState, useEffect } from 'react'


function GamesLibrary({ gamesList, handleSort, onClick, getGamesLibrary }) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredGames, setFilteredGames] = useState(gamesList);

    // const [{ id, title, summary, coverArt, status, notes, rating }] = gamesList
    // console.log(gamesList)
    // console.log(title)


    useEffect(() => {
        const lowerCaseKey = searchKeyword.toLowerCase();
    
        setFilteredGames(
            gamesList.filter((game) =>
            Object.keys(game).filter((key) => key !== 'id').some((field) =>
              game[field]?.toString().toLowerCase().includes(lowerCaseKey)
            )
          )
        );
      }, [searchKeyword, gamesList]);


      if (!filteredGames) return <div>Loading games...</div>;



    return(
        <div>
            <div className="gamesList__header">
                <div className="gamesList__sorter"onClick={() => handleSort("title")} >Sort</div>
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
            <div className="gamesList__coner">
                {filteredGames.length ==0? (<p className="result-message">No results found.</p>):
                filteredGames.map((game, index) => (
                    <Card key={game.id} gameid={game.id} title={game.title} summary={game.summary} status={game.status} rating={game.rating} tags={game.tags} imgURL={game.coverArt}
                    onClick={onClick} getGamesLibrary={getGamesLibrary}/>
                ))}
            </div>

        </div>
       
    )
}


export default GamesLibrary;