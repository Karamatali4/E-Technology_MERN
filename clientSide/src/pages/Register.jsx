import { useState } from "react";
import {useNavigate}  from "react-router-dom";
import Lottie from "lottie-react";
import regsiteranime from "../animation/animationregister.json";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
 const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
      const response =await fetch(`${import.meta.env.VITE_URL_API}/register`,{
      method:"POST",
      headers:
      {
        "Content-Type":"application/json",

      },
      body: JSON.stringify(user),
    });

    const res_data = await response.json();
      console.log("res from server: " ,res_data);
    if(response.ok){
      
      storeTokenInLS(res_data.token);
      toast.success("Registration Successfull..");
      setUser({username: "",
      email: "",
      phone: "",
      password: "",});

      navigate("/");
    }
    else{
      toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);

    }
    } catch (error) {
      console.error("register", error);
    }
    
  };

 


  return (
    <>
      <div className="container-fluid registration-section" >
        <div className="row rowflex text-center">
          {/* img side */}
          <h1 className=" fw-bold pt-3">Registration form</h1>

          <div className="col-12 col-md-5 ">
            <Lottie animationData={regsiteranime} autoplay={true} />
          </div>

          {/* form side */}
          <div className="col-12 col-md-5 ">
          <div className="registration-form">
                <br />
                <form onSubmit={handleSubmit} className="">
                  <div>
                    <label >username</label><br />
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
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
                    <label >phone</label><br />
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="phone number"
                    />
                  </div>
                  <div>
                    <label >password</label><br />
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
                    Register Now
                  </button>
                </form>
              </div>
          </div>
        </div>
      </div>
         
    </>
  );
};


 export default Register;