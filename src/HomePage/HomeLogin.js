import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styleMain/HomeLogin.css";

export default function HomeLogin(props){
    const [inpUName, setInpUName] = useState("");
    const [inpPword, setInpPword] = useState("");
    const [user, setUser] = useState([
        {
          username: "11-1111-111",
          password: "admin",
          userType: "admin"
        },
        {
          username: "22-2222-222",
          password: "sekyu",
          userType: "sekyu"
        },
    ])

    let isValidUser = false;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(props.user);
    const navigate = useNavigate();

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if(storedUser) {
        setIsLoggedIn(true);
        navigate(`/${storedUser.userType}`);
      }
    }, [navigate])

    function handleInputUser(e){
        setInpUName(e.target.value);
    }

    function handleInputPass(e){
        setInpPword(e.target.value);
    }

    function onChangeLogin() {
        for (let i = 0; i < user.length; i++) {
          if (inpUName === user[i].username && inpPword === user[i].password) {
            // Check if the user is "sekyu" and navigate accordingly
            if (inpUName === "22-2222-222" && inpPword === "sekyu") {
              localStorage.setItem("user", JSON.stringify(user[i]));
              navigate("/sekyu");
            } else if (inpUName === "11-1111-111" && inpPword === "admin"){
              localStorage.setItem("user", JSON.stringify(user[i]));
              navigate("/admin");
            }
            
            isValidUser = true;
            break;
          }
        }
        if (!isValidUser) {
          alert("Invalid username or password. Please try again.");
      }
      }
      
    return (<>

        <div className="main-container">
            <div className="cituBldg-img-login"></div>
            <div className="citulogo-img-login"></div>
            <div className="child-container">
                <div className="text-outlier">
                    <h2 className="titlePart1">Gear for Life: <br/> <span className="titlePart2">Elevate your Campus Drive.</span></h2>
                </div>
                <div className="login-container">
                    <h1 className="login-text">Login</h1>
                    <h4 className="signIn-text">Sign in to continue</h4>

                    <div className="loginBox">
                    <p className="text-u">USERNAME</p>
                    <label><input 
                    className="inputBox uName" 
                    placeholder="XX-XXXX-XX"

                    type="text"
                    value={inpUName}
                    onChange={handleInputUser}
                    ></input></label>

                    <p className="text-u">PASSWORD</p>
                    <label><input 
                    className="inputBox pWord"
                    placeholder="************"

                    type="password"
                    value={inpPword}
                    onChange={handleInputPass}
                    ></input></label>

                    </div>

                    <button className="loginUser-btn" onClick={onChangeLogin}>LOGIN</button>
                    <Link style={{ textDecoration: 'none' }} to="/home/forgotPassword"><p className="forgor-text">FORGOT YOUR PASSWORD?</p></Link>
                </div>
            </div>
            
        </div>
        
    
    </>)
}