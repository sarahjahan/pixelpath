import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/assets/controller.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <div className="navbar__menu">
          <Link to="/">Home</Link>
          <Link to="/library">Library</Link>
          <Link to="/search">Search</Link>
        </div>

        <div className="navbar__logo">
          <img
            onClick={() => navigate(`library`)}
            className="navbar__logo-img"
            src={logo}
          />
        </div>
        <Link to="/search" className="navbar__discover">
          Discover Games
        </Link>
      </div>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          stacked
        />
      </div>
    </>
  );
}

export default Navbar;
