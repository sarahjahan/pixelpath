import './GameDetails.scss'

function GameDetails({gameDetails}) {
    const {title, coverArt, notes, rating, status, summary, tags} = gameDetails
    console.log(gameDetails);
    console.log(title)


    function adjustCoverArtUrl(url, size = 't_cover_big') {
        if (!url) return '';
        const imageIdMatch = url.match(/\/t_([a-zA-Z0-9_]+)\/([a-zA-Z0-9]+)\.jpg/);
        if (!imageIdMatch) return url; 
        const imageId = imageIdMatch[2];
        return `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg`;
      }
    
      // const originalUrl = "//images.igdb.com/igdb/image/upload/t_thumb/co6x5r.jpg";
      // const newUrl = adjustCoverArtUrl(originalUrl, 't_cover_big'); // Replacing 't_thumb' with 't_cover_big'
    
      const newUrl = adjustCoverArtUrl(coverArt,'t_cover_big')

    return(
        <div className='game'>
            <div className="game__main-details">
                <h1 className="game__header">Game Details</h1>
                <h2 className="game__title">{title}</h2>
                <img className="game__coverart" src={newUrl}/>
                <p className="game__summary">{summary}</p>
            </div>


            <div className="game__sub-details">
                <p className="game__status">Status: {status}</p>
                <p className="game__tags">Related Tags: {tags}</p>
                <p className="game__notes">Notes: {notes}</p>
                <p className="game__rating">My Rating: {rating}</p>
            </div>
        </div>
    )
}

export default GameDetails;