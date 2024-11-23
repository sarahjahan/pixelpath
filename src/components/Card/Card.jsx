import './Card.scss';

function Card({title, genre}) {
  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <p className="card__subtitle">{genre}</p>
    </div>  
  );
};

export default Card;