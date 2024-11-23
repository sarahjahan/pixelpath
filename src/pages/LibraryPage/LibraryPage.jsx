import Card from "../../components/Card/Card"

function LibraryPage({gamesList}) {
    const [{ id, title, summary, coverArt, status, notes }] = gamesList
    console.log(gamesList)
    console.log(title)

    return(
        <div>
            {gamesList.length > 0 &&
            gamesList.map((game, index) => (
                <Card key={index} title={game.title} genre={game.summary} />
            ))}
        </div>
       
    )
}


export default LibraryPage