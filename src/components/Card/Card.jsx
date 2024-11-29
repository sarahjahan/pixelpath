import './Card.scss';
import editicon from '../../public/assets/icons/edit-2.svg';
import addicon from '../../public/assets/icons/plus-circle.svg';
import minusicon from '../../public/assets/icons/minus-circle.svg'
import GameForm from '../GameForm/GameForm';
import { useState } from "react";
import 'react-dropdown/style.css';
import { useNavigate } from "react-router-dom";




function Card({ game, delGame, addGame, gameid, getGamesLibrary, isSearchPage }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()


  //Code for Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
 
  //fix class name for status and see game object details
  const { coverArt, title, summary, status, rating, notes, tags, genres, id, isOwned} = game
  const statusClass = status.toLowerCase().replace(/\s+/g, '')


  //Code for Converting URL 
  // const coverBigUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
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



  return (

    <div className="card__container">
      {isSearchPage ? ( 
        <div className="card__myGame">
          <img className="card__coverart" src={newUrl}/>
          <h2 className="card__title">{title}</h2>
          <p className="card__subtitle">{genres}</p>
          <p className="card__subtitle">{tags}</p> 
          {/* <p className="card__subtitle">{summary}</p>  */}
        </div>
      ) : (
        <div className="card__myGame" onClick={() => navigate(`/details/${gameid}`)}>
          <div className={`card__subtitle--${statusClass}`}>{status}</div>
          <div className="section-divider"></div>
          <img className="card__coverart" src={newUrl}/>
          <h2 className="card__title">{title}</h2>
          <p className="card__subtitle">{genres}</p>
          <p className="card__subtitle">Personal Rating: {rating}</p>
          <p className="card__subtitle">{notes}</p>
          <p className="card__subtitle">{tags}</p> 
        </div>
      )}

        <div className="card__action">
        {isSearchPage ? (
          isOwned ? (
            <img className="card__icon" src={minusicon} onClick={() => delGame(gameid)}/>
          ) : (
            <img className="card__icon" src={addicon} onClick={() => addGame(id, title, coverArt, tags, genres)}/> )
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