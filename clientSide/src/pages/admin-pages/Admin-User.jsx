import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import {Link} from "react-router-dom";
function AdminUser() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ہر صفحہ پر دکھانے کے لیے items کی تعداد
  const { authorizationToken } = useAuth();


  // get all user data
  const getAllUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      // Ensure data is an array
      const usersArray = Array.isArray(data) ? data : data.users || [];
      
      setUsers(usersArray);

    } catch (error) {
      console.log(error);
    }
  }

  // delete operation
  const deleteUserData = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": authorizationToken,
        },
      });

      const data = await response.json();
      console.log(`user after delete ${data}`);

      if (response.ok) {
        getAllUsers();
        toast.success("Successfully deleted user..");
      }
    } catch (error) {
      console.log(error);
    }
  }
 

  useEffect(() => {
    getAllUsers();
  }, []);

  // Pagination کے لیے logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Page numbers کے لیے logic
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <>
      <div className="col-12 shadow-lg mb-5" data-bs-theme="dark">
        <div className="card">
          <div className="card-body text-center">
            <h4 className="card-title m-b-0">Users Information</h4>
          </div>
          <div className="table-responsive">
            {users.length > 0 ? (
              <>
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number(s)</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Host</th>
                    </tr>
                  </thead>
                  <tbody className="customtable">
                    {currentUsers.map((userdata, index) => {
                      const { _id, username, email, phone,isAdmin } = userdata;
                      return (
                        <tr key={index}>
                          <td>{username}</td>
                          <td>{email}</td>
                          <td>{phone}</td>
                          <td> 
                            <Link to={`${userdata._id}/edit`}> Edit </Link>
                            </td>
                          <td> <button className='rounded' onClick={() => deleteUserData(_id)}> Delete</button></td>
                          <td>{ isAdmin==true ? "Admin" : "user"}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {/* Pagination */}
                <nav>
                  <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                      <li key={number} className="page-item">
                        <a onClick={handleClick} id={number} className="page-link" role='button'>
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminUser;
