import { Link } from "react-router-dom";
import "./styleMain/HomeForgotPassword.css"
export default function HomeForgotPassword(){


    return (<>
    
    <div className="main-container">
            <div className="cituBldg-img-login"></div>
            <div className="citulogo-img-login"></div>
            <div className="child-container">
                <div className="text-outlier">
                    <h2 className="titlePart1">Gear for Life: <br/> <span className="titlePart2">Elevate your Campus Drive.</span></h2>
                </div>
                <div className="forgot-container">
                    <h1 className="forgot-text">Trouble logging in?</h1>
                    <h4 className="signIn-text">Enter the necessary credentials</h4>

                    <div className="loginBox">
                    <p className="text-u" >SCHOOL ID #</p>
                    <label><input className="inputBox uName" placeholder="XX-XXXX-XX"></input></label>
                    <p className="text-u" >SCHOOL EMAIL</p>
                    <label><input className="inputBox pWord" placeholder="juan.delacruz@cit.edu"></input></label>
                    </div>
                    <button className="loginUser-btn">RESET PASSWORD</button>
                    <Link style={{ textDecoration: 'none' }} to="/home/login"><p className="forgor-text">BACK TO LOGIN</p></Link>
                </div>
            </div>
            
        </div>
        
    
    </>)
}