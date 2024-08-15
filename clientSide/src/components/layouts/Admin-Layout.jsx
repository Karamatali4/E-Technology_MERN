import React from 'react'
import Adminmenu from './Admin-menu'

function AdminLayout() {
  return (
    <>
    
    <div className="container-fluid mt-5 text-center" style={{height:"100vh",width:"100%"}}>
    <h1 style={{fontSize:"4rem",fontWeight:"bold"}}>Admin Dashboard</h1>
                      
                    <div className="row d-flex justify-content-center align-items-center" >

                    <div className="col col-12 col-md-11 text-center" >
    <Adminmenu/>

                    </div>
                   
                </div>

                   </div> 
    </>
    
  )
}

export default AdminLayout