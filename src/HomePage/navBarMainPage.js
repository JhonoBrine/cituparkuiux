import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";

export default function NavbarMain() {
    const storedUserType = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("user");
        navigate("/home");
    }
    return (
        <nav className="navMain">
          {storedUserType && storedUserType.userType === "admin" ? (
            <>
              <Link to="/admin">
                <div className="site-logo"></div>
              </Link>
              <ul>
                <CustomLink to="/admin/create-user">Create User</CustomLink>
                <CustomLink to="/admin/search-user">Search User</CustomLink>
                <CustomLink to="/admin/search-result">Search Result</CustomLink>
                <CustomLink to="/admin/parking-slots">Parking Slots</CustomLink>
                <button onClick={handleLogout}>Logout</button>
              </ul>
            </>
          ) : storedUserType && storedUserType.userType === "sekyu" ? (
            <>
              <ul>{/* Your sekyu links go here */}</ul>
            </>
          ) : (
            <>
              <Link to="/home">
                <div className="site-logo"></div>
              </Link>
              <ul>
                <CustomLink to="/home">Home</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/parkingLotView">Parking Lot</CustomLink>
              </ul>
            </>
          )}
        </nav>
      );
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