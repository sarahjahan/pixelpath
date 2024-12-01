import './Card.scss';
import editicon from '../../public/assets/icons/edit-2.svg';
import addicon from '../../public/assets/icons/plus-circle.svg';
import minusicon from '../../public/assets/icons/minus-circle.svg'
import GameForm from '../GameForm/GameForm';
import adjustCoverArtUrl from '../../utils/adjustCoverArtUrl';
import { useState } from "react";
import 'react-dropdown/style.css';
import { useNavigate } from "react-router-dom";




function Card({ game, delGame, addGame, gameid, getGamesLibrary, isSearchPage }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
 
  const { coverArt, title, summary, status, rating, notes, tags, id, isOwned} = game
  const statusClass = status.toLowerCase().replace(/\s+/g, '')

  const newUrl = adjustCoverArtUrl(coverArt,'t_cover_big')



  return (

    <div className="card__container">
      {isSearchPage ? ( 
        <div className="card__myGame">
          <img className="card__coverart" src={newUrl}/>
          <h2 className="card__title">{title}</h2>
          <p className="card__subtitle">{tags}</p>
          {/* <p className="card__subtitle">{summary}</p>  */}
        </div>
      ) : (
        <div className="card__myGame" onClick={() => navigate(`/details/${gameid}`)}>
          <div className={`card__subtitle--${statusClass}`}>{status}</div>
          <div className="section-divider"></div>
          <img className="card__coverart" src={newUrl}/>
          <h2 className="card__title">{title}</h2>
          {rating && rating !==0 ? (
                  <p className="game__rating">My Rating: {rating}</p>
                ) : (
                  <p className="result-message">Not Rated Yet</p>
                )}
          <p className="card__subtitle">{notes}</p>
        </div>
      )}

        <div className="card__action">
        {isSearchPage ? (
          isOwned ? (
            <img className="card__icon" src={minusicon} onClick={() => delGame(gameid)}/>
          ) : (
            <img className="card__icon" src={addicon} onClick={() => addGame(id, title, coverArt, tags)}/> )
        ) : (
          <div className="card__button-container">
            <img className="card__icon" src={minusicon} onClick={() => delGame(gameid)} />
            <img className="card__icon" src={editicon} onClick={openModal} />
          </div>
        )}
      </div>

          {modalIsOpen && (<GameForm gameid={gameid} game={game} closeModal={closeModal} getGamesLibrary={getGamesLibrary} modalIsOpen={modalIsOpen} />)}

      </div>  
  );
};

export default Card;