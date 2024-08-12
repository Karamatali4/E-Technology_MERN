import { useState } from "react";
import { useNavigate}  from "react-router-dom";
import Lottie from "lottie-react";
import loginanime from "../animation/loginanime.json";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

 const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth();
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response =await fetch(`${import.meta.env.VITE_URL_API}/login`,{
      method:"POST",
      headers:
      {
        "Content-Type":"application/json",

      },
      body: JSON.stringify(user),
    });

    console.log(response);

    const res_data =await response.json();
    
    if(response.ok){
      storeTokenInLS(res_data.token);
        toast.success("Login Successfully...");
      setUser({
      email: "",
      password: "",});

      navigate("/");
    }
    else{
        // alert("Invalid Credential..");
        toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);
        

    }
    } catch (error) {
      console.error("login", error);
    }
    
  };



  return (
    <>
     <div className="container-fluid" >
        <div className="row rowflex text-center">
          {/* img side */}
          <h1 className="main-heading mt-5 fw-bold">Login here</h1>

          <div className="col-12 col-md-5 ">
            <Lottie animationData={loginanime} autoplay={true} />
          </div>

          {/* form side */}
          <div className="col-12 col-md-5 ">
          <div className="registration-form">
                <br />
                <form onSubmit={handleSubmit} className="">
                  
                  <div>
                    <label >email</label><br />
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  
                  <div>
                    <label>password</label><br />
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit" >
                    Sign in
                  </button>
                </form>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};


 export default Login;