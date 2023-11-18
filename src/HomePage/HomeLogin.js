import { Link } from "react-router-dom"
import "./styleMain/HomeLogin.css"

export default function HomeLogin(){

    return (<>

        <div className="main-container">
            <div className="cituBldg-imag3"></div>
            <div className="citulogo-image"></div>
            <div className="child-container">
                <div className="text-outlier">
                    <h2 className="titlePart1">Gear for Life: <br/> <span className="titlePart2">Elevate your Campus Drive.</span></h2>
                </div>
                <div className="login-container">
                    <h1 className="login-text">Login</h1>
                    <h4 className="signIn-text">Sign in to continue</h4>

                    <div className="loginBox">
                    <p className="text-u">USERNAME</p>
                    <label><input className="inputBox uName"></input></label>
                    <p className="text-u">PASSWORD</p>
                    <label><input className="inputBox pWord"></input></label>
                    </div>
                    <button className="loginUser-btn">LOGIN</button>
                    <Link style={{ textDecoration: 'none' }} to="/home/forgotPassword"><p className="forgor-text">FORGOT YOUR PASSWORD?</p></Link>
                </div>
            </div>
            
        </div>
        
    
    </>)
}