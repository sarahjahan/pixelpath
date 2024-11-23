import GamesLibrary from "../../components/GamesLibrary/GamesLibrary";

function LibraryPage({gamesList}) {

    return(
        <div>
            <GamesLibrary gamesList={gamesList}/>
        </div>
       
    )
}


export default LibraryPage;