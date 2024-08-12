import React from "react";
import Lottie from "lottie-react";
import mainanime from "../animation/main.json";
import AnalyticsSsection from "../components/analytics-section";
import section3anime from "../animation/section3anime.json";


function Home() {
  return (
    <>
      <div className="container-fluid colflex">
        <div className="row rowflex hero-section">
          {/* hero text side  */}
          <div className="col-12 col-md-5 text-section ">
            <p>We are the World Best IT Company</p>
            <h1>Welcome to E-Learining</h1>
            <p>
              Are you ready to take your business to the next level with
              cutting-edge IT solutions? Look no further! At E-Learining, we
              specialize in providing innovative IT services and solutions
              tailored to meet your unique needs.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/service">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>

          {/* hero image side  */}
          <div className="col-12 col-md-5 img-section rowflex">
            {/* <img src={mainpic} className='img-fluid rounded'  width={600} alt="hero_image" /> */}
            <Lottie animationData={mainanime} />
          </div>
        </div>

        {/* section 2 */}
        <AnalyticsSsection/>

        {/* section 3 */}

        <div className="row rowflex hero-section mb-5">


          {/* hero image side  */}
          <div className="col-12 col-md-5 img-section rowflex">
            {/* <img src={mainpic} className='img-fluid rounded'  width={600} alt="hero_image" /> */}
            <Lottie animationData={section3anime} />
          </div>


          {/* hero text side  */}
          <div className="col-12 col-md-5 text-section mb-5">
          <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how E-Learining can help your business thrive in
              the digital age.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/service">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>

          
        </div>

      </div>
    </>
  );
}

export default Home;
