import React from 'react';
import {Navigate, NavLink, Outlet} from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiContactsBook3Fill } from "react-icons/ri";
import { GrBusinessService } from "react-icons/gr";
import { useAuth } from '../../store/auth';
import { IoMdLogOut } from "react-icons/io";


function Adminmenu() {
  const {user,isLoading}= useAuth(); 

  if(isLoading){
    return <h1>Loadning....</h1>
  }
  if(!user.isAdmin)
    {
      return <Navigate to={"/"} />
    }
  return (
    <>
    <header>
      <nav className='d-flex justify-content-between align-items-center'>
        <ul>
          <li> <NavLink to="/"> <IoHomeSharp/> Home </NavLink> </li>
          <li><NavLink to="/admin/users"> <FaUser/> Users </NavLink> </li>
          <li><NavLink to="/admin/contacts"> <RiContactsBook3Fill/> Contact </NavLink> </li>
          <li><NavLink to="/service"> <GrBusinessService/> Services </NavLink> </li>
          
        </ul>
        <ul>
          <li> <NavLink to="/logout"> <IoMdLogOut/> Logout </NavLink> </li>
          
          
        </ul>
      </nav>
    </header>
    <Outlet/>
    </>
  )
}

export default Adminmenu