import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function AdminContact() {
  const [contact, setContact] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page
  const { authorizationToken } = useAuth();

  const getAllContacts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/api/admin/contact`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      // Ensure that data is an array
      const contactsArray = Array.isArray(data) ? data : data.contacts || [];
      
      setContact(contactsArray);
    } catch (error) {
      console.log(error);
    }
  }

  const UpdateContactData = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/api/admin/contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": authorizationToken,
        },
      });
      const data = await response.json();

      console.log("contact Data successfully deleted. ", data);

      if (response.ok) {
        getAllContacts();
        toast.success("Successfully deleted contact...");
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);

  // Logic for displaying contacts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contact.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(contact.length / itemsPerPage); i++) {
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
            {contact.length > 0 ? (
              <>
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Messages</th>
                      
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="customtable">
                    {currentContacts.map((userdata, index) => {
                      const { _id, username, email, message } = userdata;
                      return (
                        <tr key={_id || index}>
                          <td>{username}</td>
                          <td>{email}</td>
                          <td>{message}</td>
                          
                          <td> <button className='rounded' onClick={() => UpdateContactData(_id)}> Delete</button></td>
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
              <p>No contacts found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminContact;
