import './Navbar.scss';
import { useNavigate } from "react-router-dom";

function Navbar() {

const navigate = useNavigate()


    return(
        <>
        <div className="navbar">
            <a href="/library">Library</a>
            <a className="navbar__discover"href="/search">Discover New Games</a>
            {/* <p className="site-header">Tracking your gaming journey, one pixel at a time ... </p> */}
        </div>
        
        </>
    )
}

export default Navbar;
