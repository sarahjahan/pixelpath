import './Card.scss';
import delicon from '../../public/assets/icons/trash-2.svg';
import editicon from '../../public/assets/icons/edit-2.svg';


function Card({title, genre, imgURL}) {

  return (

    <div className="card__container">
      <img src={imgURL}/>
      <h2 className="card__title">{title}</h2>
      <p className="card__subtitle">{genre}</p>

      <div className="card__action">
        <img className="card__action--delete" src={delicon}/>
        <img className="card__action--edit" src={editicon}/>
      </div>
    </div>  


  );
};

export default Card;