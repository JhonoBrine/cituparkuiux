import { Link, useNavigate } from "react-router-dom"
import "./styleMain/HomeLogin.css"
import { useState } from "react";

export default function HomeLogin(props){
    const [inpUName, setInpUName] = useState("");
    const [inpPword, setInpPword] = useState("");
    const [user, setUser] = useState([
        {username: "11-1111-111",
         password: "admin",
         userType: "admin"
        },
        {username: "22-2222-222",
         password: "sekyu",
         userType: "sekyu"
        },
    ])

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(props.user);
    const navigate = useNavigate();
    function handleInputUser(e){
        setInpUName(e.target.value);
    }

    function handleInputPass(e){
        setInpPword(e.target.value);
    }

    function onChangeLogin() {
        for (let i = 0; i < user.length; i++) {
          if (inpUName === user[i].username && inpPword === user[i].password) {
            localStorage.setItem("user", JSON.stringify(user[i]));
      
            // Check if the user is "sekyu" and navigate accordingly
            if (inpUName === "22-2222-222" && inpPword === "sekyu") {
              navigate("/sekyu");
            } else {
              navigate("/admin");
            }
            
            break;
          }
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