import aboutus from "../assets/images/aboutus.png";
import { NavLink } from "react-router-dom";
import AnalyticsSsection from "../components/analytics-section";
import { useAuth } from "../store/auth";
function About() {

  const {user} = useAuth();
  console.log("auth data ",user);
  return (

    <>
    <div className="container-fluid" style={{display:"flex", flexDirection:"column",alignContent:"center",alignItems:"center" }}>
      <div className="row aboutsection rowflex">

        {/* text area */}
        <div className="col-12 col-md-5 textsection mb-5">
          <p>welcome,  { user ? `${user.username} to our website`: 'to our website'
          
        }</p>
          <h2 className="fs-4 mb-3 mt-2">Welcome, E-Learning </h2>
        <h1 className="mb-3">Why Choose Us? </h1>
              <p>
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p>
                Customization: We understand that every business is unique.
                Thats why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              <p>
                Customer-Centric Approach: We prioritize your satisfaction and
                provide top-notch support to address your IT concerns.
              </p>
              <p>
                Affordability: We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p>
                Reliability: Count on us to be there when you need us. We're
                committed to ensuring your IT environment is reliable and
                available 24/7.
              </p>
              <div className="btn btn-group">
                
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>
                <button className="btn secondary-btn ">learn more</button>
              </div>
        </div>


         {/* iamge area */}
         <div className="col-12 col-md-5 mb-5">
        <img src={aboutus} alt="aboutimage" width={500} className="img-fluid" />
</div>
      </div>

      <AnalyticsSsection/>
    </div>

    </>

  )
}

export default About