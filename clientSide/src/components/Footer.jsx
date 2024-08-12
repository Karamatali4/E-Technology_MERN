import React from 'react'

function Footer() {
    let mydate = new Date();
    let year = mydate.getFullYear();

  return (
    <>
    <div className="footer text-center rowflex">
        <p> <span className='text-primary fw-bold'>©</span> Copyright {year}, All rights reserved!</p>
    </div>
    </>
  )
}

export default Footer;