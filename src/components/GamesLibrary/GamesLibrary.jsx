import Card from "../../components/Card/Card"


function GamesLibrary({gamesList}) {
    const [{ id, title, summary, coverArt, status, notes }] = gamesList
    console.log(gamesList)
    console.log(title)

    return(
        <div className="gamesList__container">
            {gamesList.length > 0 &&
            gamesList.map((game, index) => (
                <Card key={index} title={game.title} genre={game.summary} imgURL={game.coverArt}/>
            ))}
        </div>
       
    )
}


export default GamesLibrary;