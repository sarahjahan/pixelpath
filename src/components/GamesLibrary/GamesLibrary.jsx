import Card from "../../components/Card/Card"
import Select from 'react-select';
import './GamesLibrary.scss'
import { useState } from 'react'
import Button from '../Button/Button'
import MoodReco from "../MoodReco/MoodReco";
import themeToMoodMap from '../../utils/themeToMoodMap'

function GamesLibrary({ gamesList, handleSort, delGame, addGame, getGamesLibrary, gamesAPIList, isSearchPage, handleClearMood }) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [genreFilter, setGenreFilter] = useState(null);
    const [moodFilter, setMoodFilter ] = useState(null)
    const [selectedMood, setSelectedMood] = useState(null)



    const filteredGames = (isSearchPage ? gamesAPIList : gamesList).filter((game) => {
        const matchesSearch = game.title?.toLowerCase().includes(searchKeyword.toLowerCase());
        const matchesStatus = statusFilter ? (statusFilter.value === null || game.status === statusFilter.value) : true;        
        const matchesGenre = genreFilter ? game.tags?.toLowerCase().split(',').some(tags => tags.trim() === genreFilter.value.toLowerCase()) : true;
        const matchesMood = moodFilter ? game.tags?.some((tag) => {
            const tagName = typeof tag === "string" ? tag : tag.name;
            return themeToMoodMap[tagName] === moodFilter; }) 
            : true;
    
        return matchesSearch && matchesStatus && matchesGenre && matchesMood;
        });

  const handleClearFilters = () => {
    setSearchKeyword("");
    setStatusFilter(null);
    setGenreFilter(null);
    setMoodFilter(null);
    setSelectedMood(null);
  };


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
            
            {isSearchPage ? null : <MoodReco setMoodFilter={setMoodFilter} setSelectedMood={setSelectedMood} selectedMood={selectedMood} />}
            
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


                <div className="gamesList__sorter">
                  <div className="gamesList__sort-label label-text">Sort By:</div>
                    <Button className="gamesList__sort-button" onClick={() => handleSort("title")} actiontext={"Title"}/>
                    <Button className="gamesList__sort-button" onClick={() => handleSort("rating")} actiontext={"Rating"}/>
                    <Button className="gamesList__sort-button" onClick={() => handleSort("status")} actiontext={"Status"}/>
                    <Button className="gamesList__clear-button" onClick={handleClearFilters} actiontext="Clear All Filters"/>
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