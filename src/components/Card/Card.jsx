import './Card.scss';
import delicon from '../../public/assets/icons/trash-2.svg';
import editicon from '../../public/assets/icons/edit-2.svg';
import GameForm from '../GameForm/GameForm';
import { useState, useEffect } from "react";



function Card({ imgURL, title, summary, status, rating, notes, tags, onClick, gameid, getGamesLibrary }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (

    <div className="card__container">
      <p className="card__subtitle--status">{status}</p>
      {/* <img src={imgURL}/> */}
      <h2 className="card__title">{title}</h2>
      <p className="card__subtitle">{summary}</p>
      <p className="card__subtitle">{rating}</p>
      <p className="card__subtitle">{notes}</p>
      <p className="card__subtitle">{tags}</p>
      <div className="card__action">
        <img className="card__action--delete" src={delicon} onClick={() => onClick(gameid)}/>
        {/* <button className="icon" onClick={openModal}><img src={editIcon}/></button> */}
        <img className="card__action--edit" src={editicon} onClick={() => openModal()}/>
        </div>
          {modalIsOpen && (<GameForm gameid={gameid} closeModal={closeModal}  getGamesLibrary={getGamesLibrary} />)}
        </div>  


  );
};

export default Card;