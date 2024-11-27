import './Button.scss';
import minusicon from'../../public/assets/icons/minus-circle.svg'

function Button({onClick, actiontext}) {
  return (
    <>
      <button className="button" onClick={onClick}>{actiontext}
      {/* <img className="icon" src={minusicon} /> */}
      </button>
      

    </>
  );
};

export default Button;