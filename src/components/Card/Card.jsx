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

  const { coverArt, title, summary, status, rating, notes, tags, name, genres, cover } = game



  return (

    <div className="card__container">
      {isSearchPage ? ( 
        <>
        <img src={cover.url}/>
        <h2 className="card__title">{name}</h2>
        <p className="card__subtitle">{genres[0].name}</p>
        <p className="card__subtitle">{rating}</p>
        <p className="card__subtitle">{notes}</p>
        <p className="card__subtitle">{tags}</p> 
        </>
      ) : (
        <>
        <p className="card__subtitle--status">{status}</p>
        <img src={coverArt}/>
        <h2 className="card__title">{title}</h2>
        <p className="card__subtitle">{summary}</p>
        <p className="card__subtitle">{rating}</p>
        <p className="card__subtitle">{notes}</p>
        <p className="card__subtitle">{tags}</p> 
        </>
      )}

        <div className="card__action">
        {isSearchPage ? (
           <img className="card__action--add" src={addicon} onClick={() => addGame(gameid)}/>
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