import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function NavbarMain() {

    return (<>
    
        <nav className="navMain">

            
            <Link to="/home"><div className="site-logo"></div></Link>

            <ul>
                <CustomLink to="/home">Home</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/parkingLotView">Parking Lot</CustomLink>
            </ul>
        </nav>
    </>)
}

function CustomLink({ to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: false});
    return (

        <li className={isActive ? "active" : ""}>
            <Link to={to}>{children}</Link>
        </li>
    )
}