import React, { useState, useEffect } from 'react';
import contactform from "../assets/images/contactform.png";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

function Contact() {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: ""
  });
  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (userData && user) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: ""
      });
      setUserData(false);
    }
  }, [user, userData]);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      });
      if (response.ok) {
        setContact({
          username: "",
          email: "",
          message: ""
        });
        toast.success("Form Successfully send....")
      }
      console.log(response);
    } catch (error) {
      console.log("form error", error);
    }
    console.log(contact);
  };

  return (
    <>
      <div className="container-fluid py-5" style={{ height: "100vh" }}>
        <h1 className='text-center ' style={{ fontSize: "3.5rem", fontWeight: "bold" }}>Contact Form</h1>
        <div className="row rowflex">
          <div className="col-12 col-md-5 rowflex">
            <img src={contactform} alt="contactform" width={400} className='img-fluid' />
          </div>
          <div className="col-12 col-md-5 contactform">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">User Name</label><br />
                <input 
                  type="text"
                  name='username'
                  value={contact.username}
                  placeholder='Enter user name'
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label><br />
                <input 
                  type="email"
                  name='email'
                  value={contact.email}
                  placeholder='Enter email'
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className='mb-1'>Message</label><br />
                <textarea
                  name="message"
                  id="message"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="31"
                  rows="6"
                ></textarea><br />
                <button type="submit" className="btn btn-submit mt-3">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
