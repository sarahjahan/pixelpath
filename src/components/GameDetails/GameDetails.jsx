import './GameDetails.scss'
import adjustCoverArtUrl from '../../utils/adjustCoverArtUrl';

function GameDetails({gameDetails}) {
    
    const {title, coverArt, notes, rating, status, summary, tags = []} = gameDetails;
    const statusClass = (status || 'default').toLowerCase().replace(/\s+/g, '') || 'default-status';
    
    const newUrl = adjustCoverArtUrl(coverArt,'t_cover_big')

    return(
        <div className='game'>
            <div className="game__main-details">
                <h2 className="game__title">{title}</h2>
                <img className="game__coverart" src={newUrl}/>
                <p className="game__summary">{summary}</p>
            </div>

            <div className="game__sub-details">
              <h2 className="game__title">My Game Details</h2>

              <div className="labels">
                <label className="label-text__game">Status:</label>
                <p className={`game__status--${statusClass}`}>{status}</p>
              </div>
              <div className="labels">
                <label className="label-text__game">Notes:</label>
                {notes && notes.length > 0 ? (
                  <p className="game__notes">{notes}</p>
                ) : (
                  <p className="result-message">No notes have been created for this game.</p>
                )}
              </div>
              
              <div className="labels">
                <label className="label-text__game">My Rating: </label>
                {rating && rating !==0 ? (
                  <p className="game__rating">{rating}</p>
                ) : (
                  <p className="result-message">No rating has been given for this game.</p>
                )}
              </div>
              <div className="labels">
                <label className="label-text__game">Related Tags:</label>
                {tags && tags.filter((tag) => tag && tag.name).length > 0 ? (
                  tags.filter((tag) => tag && tag.name)
                  .map((tag) => (
                    <div className="game__tags-container" key={tag.id}>
                      <p className="game__tags tag-text">{tag.name}</p> 
                    </div> 
                  ))
                  ) : (
                    <p className="result-message">No tags found.</p>
                  )}
              </div>
            </div>
        </div>
    )
}

export default GameDetails;