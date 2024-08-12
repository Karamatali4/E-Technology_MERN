import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminUpdate() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        isAdmin: false
    });

    const { authorizationToken } = useAuth();
    const { id } = useParams();

    const singleUsergetData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/api/admin/users/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": authorizationToken,
                },
            });

            const data = await response.json();
            console.log("Single user data: ", data);
            setUser({
                username: data.username || "",
                email: data.email || "",
                phone: data.phone || "",
                isAdmin: data.isAdmin || false
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        singleUsergetData();
    }, []);

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        
        setUser({
            ...user,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/api/admin/users/update/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": authorizationToken,
                },
                body: JSON.stringify(user),
            });

            if(response.ok){
                toast.success("Updated Successfully...");
            } else{
                toast.error("Not Updated ...");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row rowflex text-center">
                    <h1>Update User Form</h1>
                    <div className="col-12 col-md-5">
                        <div className="registration-form">
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Username</label><br />
                                    <input
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleInput}
                                        placeholder="Username"
                                    />
                                </div>
                                <div>
                                    <label>Email</label><br />
                                    <input
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInput}
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <label>Phone</label><br />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleInput}
                                        placeholder="Phone Number"
                                    />
                                </div>
                                <div>
                                    <label>Is Admin</label><br />
                                    <input
                                        type="checkbox"
                                        name="isAdmin"
                                        checked={user.isAdmin}
                                        onChange={handleInput}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">
                                    Update Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUpdate;
