import "./styleMain/AboutPage.css";

export default function AboutPage() {
  return (
    <>
      
      <div className="main-container">
        <div className="citulogo-image"></div>
        <div className="text-container">
          <h2 className="about-title">Elevate your Campus Drive with ParkIT</h2>

          <p>
          Established in 2023, CIT-U proudly presents ParkIT, a brainchild of our
          visionary creators dedicated to <br/> enhancing your daily campus experience
          </p>

          <h3>Innovation by Design</h3>

          <p>
          Crafted with a keen understanding of the parking management and challenges faced on campus.
          </p>

          <h3>Creators at the Core</h3>

          <div className="profile-container">
            <div className="profile p1"><img/><span>Jhon Lorenz Pabroa</span></div>
            <div className="profile p2"><img/><span>April Justine Vega</span></div>
            <div className="profile p3"><img/><span>Rey Mar Segalle</span></div>
            <div className="profile p4"><img/><span>Jasmine Lisondra</span></div>

          </div>
        </div>
        
      </div>

     
    </>
  )
}
