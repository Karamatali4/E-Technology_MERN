import React from 'react'
import Adminmenu from './Admin-menu'

function AdminLayout() {
  return (
    <>
    
    <h1>Admin Dashboard</h1>
    <div className="container-fluid">
                      
                    <div className="row" >

                    <div className="col col-12 col-md-12" >
    <Adminmenu/>

                    </div>
                    
                </div>

                   </div> 
    </>
    
  )
}

export default AdminLayout