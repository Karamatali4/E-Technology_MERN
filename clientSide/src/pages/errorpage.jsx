import React from 'react'
import { NavLink } from 'react-router-dom'

function Errorpage() {
  return (
    <>

    <div className="container-fluid my-2">
      <div className="row errorsection my-2">
        <div className="col-12 col-md-5">
        <h2 className="header">404</h2>
          <h4>Sorry! Page not found</h4>
          <p>
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
        </div>
        <div className="col-12 col-md-5">
        <div className="btns">
            <NavLink to="/">return home</NavLink>
            <NavLink to="/contact">report problem</NavLink>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default Errorpage