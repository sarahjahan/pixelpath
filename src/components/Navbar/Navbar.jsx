import './Navbar.scss';
import { useNavigate } from "react-router-dom";
import logo from "../../public/assets/controller.png"

function Navbar() {

const navigate = useNavigate()


    return(
        <>
        <div className="navbar">
            <div className="navbar__menu">
                <a href="/library">Library</a>
                <a href="/search">Search</a>
            </div>

            <div className="navbar__logo">
                <img onClick={() => navigate(`library`)} className="navbar__logo-img" src={logo} />
            </div>
            <a className="navbar__discover" href="/search">Discover New Games</a>
            {/* <p className="site-header">Tracking your gaming journey, one pixel at a time ... </p> */}
        </div>
        
        </>
    )
}

export default Navbar;
