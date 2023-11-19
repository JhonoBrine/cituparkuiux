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

            <div className="profile"><div className="profile-img pab1"></div><span className="span-name">Jhon Lorenz Pabroa</span><span className="span-prof">"Life is a gacha."</span></div>

            <div className="profile jusprof"><div className="profile-img jus2"></div><span className="span-name">April Justine Vega</span><span className="span-prof">“Im only one call away, <br/>ill be there to save the day”</span></div>

            <div className="profile"><div className="profile-img rey3"></div><span className="span-name">Rey Mar Segalle</span><span className="span-prof">"Just keep moving forward"</span></div>

            <div className="profile"><div className="profile-img jas4"></div><span className="span-name">Jasmine Lisondra</span><span className="span-prof">"What I Want is Already Mine!"</span></div>

          </div>

          <p>
          Meet the minds behind the revolution. Our creators ,driven by a passing for improving campus life, have <br/> developed ParkIT to reflect our dedication to making every journey at CIT-U seamless, stress-free and of <br/> course GEAR FOR LIFE.
          </p>

          <h3>Safety, Simplified</h3>

          <p>
          Your safety is paramount. ParkIT goes beyond covenience by integrating cutting-edge security features, <br/> ensuring the protection of your vehicle and providing you with unmatched peace of mind.
          </p>
          <br/>
          <p>
          Thank you Visitor!
          </p>
        </div>
        
      </div>

     
    </>
  )
}
