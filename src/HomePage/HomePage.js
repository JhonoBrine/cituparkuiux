import { Link, useNavigate } from "react-router-dom"
import "./styleMain/HomePage.css"
import { useEffect } from "react";

export default function HomePage(){
    
    return (<>
        
            <div className="main-content">
                <div className="cituBldg-image"></div>
                <div className="citulogo-image"></div>
                <div className="homeLogin-container">
                    <h1 className="home-textTitle">
                        Gear for Life: 
                        <br/> 
                        <span className="span-textTitle">
                            Elevate your
                            <br/>
                            Campus Drive
                        </span>
                    </h1>
                    <p className="para-text">Start Your Seamless Journey: GEAR for Effortless <br/> Mobility with CIT's Parking Solutions</p>
                    <div>
                    <Link to="/home/login"><button className="homeLogin-btn">LOGIN</button></Link>
                    </div>
                </div>
               
            </div>
            
    </>)
}