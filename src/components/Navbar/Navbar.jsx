import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../public/assets/controller.png"

function Navbar() {

const navigate = useNavigate()


    return(
        <>
        <div className="navbar">
            <div className="navbar__menu">
                <Link to="/library">Library</Link>
                <Link to="/search">Search</Link>
            </div>

            <div className="navbar__logo">
                <img onClick={() => navigate(`library`)} className="navbar__logo-img" src={logo} />
            </div>
            <Link to="/search" className="navbar__discover">Discover New Games</Link>
            {/* <p className="site-header">Tracking your gaming journey, one pixel at a time ... </p> */}
        </div>
        
        </>
    )
}

export default Navbar;
