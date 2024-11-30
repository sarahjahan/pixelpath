import './GameDetails.scss'

function GameDetails({gameDetails}) {
    
    const {title, coverArt, notes, rating, status, summary, genres = [], tags = [], id} = gameDetails;
    const statusClass = (status || 'default').toLowerCase().replace(/\s+/g, '') || 'default-status';

    console.log('Game Details:', gameDetails);
    console.log('Status:', status);

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
                <h2 className="game__title">{title}</h2>
                <img className="game__coverart" src={newUrl}/>
                <p className="game__summary">{summary}</p>
                <p className="game__genre">{genres}</p>
            </div>

            <div className="game__sub-details">
            <div className="labels">
              <label className="label-text__game">Status:</label>
                <p className="game__status">{status}</p>
              </div>
              <div className="labels">
                <label className="label-text__game">Related Tags:</label>
                  {tags.length === 0 ? (
                    <p className="result-message">No tags found.</p>
                  ) : (
                    tags.map((tag, index) => (
                      <div className="game__tags-container">
                        <p className="game__tags"key={index}>{tag}</p> 
                      </div>
                  ))
                  )}
              </div>
             <div className="labels">
              <label className="label-text__game">Notes:</label>
              <p className="game__notes">{notes}</p>
             </div>
              <div className="labels">
                <label className="label-text__game">My Rating: </label>
                <p className="game__rating">{rating}</p>
              </div>


            </div>
        </div>
    )
}

export default GameDetails;