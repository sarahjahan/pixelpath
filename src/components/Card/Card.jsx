import './Card.scss';
import delicon from '../../public/assets/icons/trash-2.svg';
import editicon from '../../public/assets/icons/edit-2.svg';
import addicon from '../../public/assets/icons/plus-circle.svg';
import minusicon from '../../public/assets/icons/minus-circle.svg'
import GameForm from '../GameForm/GameForm';
import { useState, useEffect } from "react";



function Card({ game, delGame, addGame, gameid, getGamesLibrary, isSearchPage }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { coverArt, title, summary, status, rating, notes, tags, genres, id, isOwned} = game
  console.log(status)
  const statusClass = status.toLowerCase().replace(/\s+/g, '')


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
        <>
          <img className="card__coverart" src={newUrl}/>
          <h2 className="card__title">{title}</h2>
          <p className="card__subtitle">{genres}</p>
          {/* <p className="card__subtitle">{summary}</p>  */}
        </>
      ) : (
        <div className="card__myGame">
          <div className={`card__subtitle--${statusClass}`}>{status}</div>
          <div className="section-divider"></div>
          <img className="card__coverart" src={newUrl}/>
          <h2 className="card__title">{title}</h2>
          <p className="card__subtitle">Personal Rating: {rating}</p>
          <p className="card__subtitle">{notes}</p>
          <p className="card__subtitle">{tags}</p> 
        </div>
      )}

        <div className="card__action">
        {isSearchPage ? (
          isOwned ? (
            <img className="card__action--del" src={minusicon} onClick={() => delGame(gameid)}/>
          ) : (

            <img className="card__action--add" src={addicon} onClick={() => addGame(id, title, coverArt)}/>          )
        ) : (
            <>
            <img className="card__action--delete" src={minusicon} onClick={() => delGame(gameid)} />
            <img className="card__action--edit" src={editicon} onClick={openModal} />
            </>
        )}
      </div>

          {modalIsOpen && (<GameForm gameid={gameid} game={game} closeModal={closeModal} getGamesLibrary={getGamesLibrary} />)}

      </div>  


  );
};

export default Card;