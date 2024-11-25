import './Card.scss';
import delicon from '../../public/assets/icons/trash-2.svg';
import editicon from '../../public/assets/icons/edit-2.svg';
import addicon from '../../public/assets/icons/plus-circle.svg';
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

  const { coverArt, title, summary, status, rating, notes, tags, genres, id } = game

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
        <p className="card__subtitle">{rating}</p>
        <p className="card__subtitle">{notes}</p>
        <p className="card__subtitle">{summary}</p> 
        </>
      ) : (
        <>
        <p className="card__subtitle--status">{status}</p>
        <img className="card__coverart" src={newUrl}/>
        <h2 className="card__title">{title}</h2>
        <p className="card__subtitle">{summary}</p>
        <p className="card__subtitle">{rating}</p>
        <p className="card__subtitle">{notes}</p>
        <p className="card__subtitle">{tags}</p> 
        </>
      )}

        <div className="card__action">
        {isSearchPage ? (
           <img className="card__action--add" src={addicon} onClick={() => addGame(title, coverArt)}/>
          ) : (
            <>
            <img className="card__action--delete" src={delicon} onClick={() => delGame(gameid)} />
            <img className="card__action--edit" src={editicon} onClick={openModal} />
            </>
        )}
      </div>
          {/* <img className="card__action--delete" src={delicon} onClick={() => onClick(gameid)}/>
          <button className="icon" onClick={openModal}><img src={editIcon}/></button>
          <img className="card__action--edit" src={editicon} onClick={() => openModal()}/>
          {modalIsOpen && (<GameForm gameid={gameid} closeModal={closeModal} getGamesLibrary={getGamesLibrary} />)}
        </div> */}

          {modalIsOpen && (<GameForm gameid={gameid} closeModal={closeModal} getGamesLibrary={getGamesLibrary} />)}

      </div>  


  );
};

export default Card;