import './Navbar.scss';

function Navbar() {
    return(
        <>
        <div className="navbar">
            <a className="navbar__logo" href="/">Home</a>
            <a href="/library">Library</a>
            <a href="/search">Search</a>
            {/* <p className="site-header">Tracking your gaming journey, one pixel at a time ... </p> */}
        </div>
        </>
    )
}

export default Navbar;
