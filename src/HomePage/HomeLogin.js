import { Link, useNavigate } from "react-router-dom"
import "./styleMain/HomeLogin.css"
import { useState } from "react";

export default function HomeLogin(props){
    const [inpUName, setInpUName] = useState("");
    const [inpPword, setInpPword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    function handleInputUser(e){
        setInpUName(e.target.value);
    }

    function handleInputPass(e){
        setInpPword(e.target.value);
    }

    function onChangeLogin(){

        for(let i = 0; i < length(props.user); i++){
            if(inpUName === props.user.userName && inpPword=== props.user.passWord){
                navigate("/admin");
                setIsLoggedIn(true);
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
                    className="inputBox uName" placeholder="XX-XXXX-XX"

                    type="text"
                    value={inpUName}
                    onChange={handleInputUser}
                    ></input></label>

                    <p className="text-u">PASSWORD</p>
                    <label><input 
                    className="inputBox pWord"placeholder="************"

                    
                    type="password"
                    value={inpPword}
                    onChange={handleInputPass}
                    ></input></label>

                    </div>
                    <button className="loginUser-btn">LOGIN</button>
                    <Link style={{ textDecoration: 'none' }} to="/home/forgotPassword"><p className="forgor-text">FORGOT YOUR PASSWORD?</p></Link>
                </div>
            </div>
            
        </div>
        
    
    </>)
}