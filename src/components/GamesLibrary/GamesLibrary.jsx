import Card from "../../components/Card/Card"
import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";


import './GamesLibrary.scss'
import { useState, useEffect } from 'react'


function GamesLibrary({ gamesList, handleSort, delGame, addGame, getGamesLibrary, gamesAPIList, isSearchPage }) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);

    // const [{ id, title, summary, coverArt, status, notes, rating }] = gamesList
    // console.log(gamesList)
    // console.log(title)

    useEffect(() => {
        if (isSearchPage) {
          setFilteredGames(gamesAPIList); 
        } else {
          setFilteredGames(gamesList);
        }
      }, [gamesList, gamesAPIList, isSearchPage]);


      useEffect(() => {
        if (searchKeyword) {
          setFilteredGames((prevFilteredGames) =>
            prevFilteredGames.filter((game) =>
              game.title.toLowerCase().includes(searchKeyword.toLowerCase())
            )
          );
        } else {
          // If no search keyword, reset to the appropriate list
          if (isSearchPage) {
            setFilteredGames(gamesAPIList);
            console.log(gamesAPIList)
          } else {
            setFilteredGames(gamesList);
            console.log(gamesList)

          }
        }
      }, [searchKeyword, gamesList, gamesAPIList, isSearchPage]);

    // useEffect(() => {
    //     const lowerCaseKey = searchKeyword.toLowerCase();
    
    //     setFilteredGames(
    //         gamesList.filter((game) =>
    //         Object.keys(game).filter((key) => key !== 'id').some((field) =>
    //           game[field]?.toString().toLowerCase().includes(lowerCaseKey)
    //         )
    //       )
    //     );
    //   }, [searchKeyword, gamesList]);


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
            <div className="gamesList__container">
                {filteredGames.length ==0? (<p className="result-message">No results found.</p>):
                filteredGames.map((game, index) => (
                    <Card key={game.id}
                    game={game} 
                    gameid={game.id} 
                    title={game.title} 
                    delGame={delGame}
                    addGame={addGame} 
                    getGamesLibrary={getGamesLibrary}
                    isSearchPage={isSearchPage}  />
                ))}
            </div>
        </div>
       
    )
}


export default GamesLibrary;