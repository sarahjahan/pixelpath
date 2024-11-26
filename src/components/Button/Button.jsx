import './Button.scss';
import minusicon from'../../public/assets/icons/minus-circle.svg'

function Button({onClick}) {
  return (
    <>
      <button className="button" onClick={onClick}>
      <img className="icon" src={minusicon} />
      </button>
      

    </>
  );
};

export default Button;