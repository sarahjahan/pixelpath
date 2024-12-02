import "./Button.scss";
import minusicon from "../../public/assets/icons/minus-circle.svg";

function Button({ onClick, actiontext }) {
  return (
    <>
      <button className="button" onClick={onClick}>
        {actiontext}
      </button>
    </>
  );
}

export default Button;
