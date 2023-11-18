import { Link } from "react-router-dom";
import "./styleMain/HomeForgotPassword.css"
export default function HomeForgotPassword(){


    return (<>
    
    <div className="main-container">
            <div className="cituBldg-imag3"></div>
            <div className="citulogo-image"></div>
            <div className="child-container">
                <div className="text-outlier">
                    <h2 className="titlePart1">Gear for Life: <br/> <span className="titlePart2">Elevate your Campus Drive.</span></h2>
                </div>
                <div className="forgot-container">
                    <h1 className="forgot-text">Trouble logging in?</h1>

                    <div className="loginBox">
                    <p className="text-u">USERNAME</p>
                    <label><input className="inputBox uName"></input></label>
                    <p className="text-u">PASSWORD</p>
                    <label><input className="inputBox pWord"></input></label>
                    </div>
                    <button className="loginUser-btn">RESET PASSWORD</button>
                    <Link style={{ textDecoration: 'none' }} to="/home/login"><p className="forgor-text">BACK TO LOGIN</p></Link>
                </div>
            </div>
            
        </div>
        
    
    </>)
}