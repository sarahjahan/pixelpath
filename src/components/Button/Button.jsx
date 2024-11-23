import './Button.scss';

function Button({onClick}) {
  return (
    <>
      <button className="button" onClick={onClick}> Get Games </button>
    </>
  );
};

export default Button;