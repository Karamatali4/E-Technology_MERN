import { useState } from 'react';
import './index.css';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Errorpage from './pages/errorpage';
import Contact from './pages/contact';
import Service from './pages/service';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import About from './pages/about';
import Footer from './components/Footer';
import Logout from './pages/Logout';
import AdminLayout from './components/layouts/Admin-Layout';
import AdminUser from './pages/admin-pages/Admin-User';
import AdminContact from './pages/admin-pages/Admin-Contact';
import AdminUpdate from './pages/admin-pages/Admin-Update';
import { useAuth } from './store/auth';

function App() {
  const { user, isLoading } = useAuth();

  // Avoid rendering until user is loaded
  if (isLoading) {
    return <div>Loading...</div>; // You can add a spinner or a loading screen here
  }

  return (
    <BrowserRouter>
      <Content user={user} />
    </BrowserRouter>
  );
}

function Content({ user }) {
  const location = useLocation();

  // Check if the current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Show Navbar on all routes except admin routes */}
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/service' element={<Service />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<Errorpage />} /> 
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='users' element={<AdminUser />} />
          <Route path='contacts' element={<AdminContact />} />
          <Route path='users/:id/edit' element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
