import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";

function LibraryPage({gamesList}) {

    if (!gamesList.length === 0) {
        return (
            <div>no games found...</div>
        )}

    return(
        <div>
            <GamesLibrary gamesList={gamesList}/>
        </div>
       
    )
}


export default LibraryPage;