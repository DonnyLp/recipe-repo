import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdminNavbar } from "../components/AdminNavbar";
import '../styles/Verifications.css';

const AdminHome = () => {
    const [verifications, setVerifications] = useState([]); 

    useEffect(() => {
        const fetchVerifications = async () => {
            try {
                const response = await axios.get("http://localhost:9000/getVerifications");
                const extractedData = response.data.map((user) => user[2]); 
                
                const userDetails = await Promise.all(
                    extractedData.map(async (item) => {
                        try {
                            const userResponse = await axios.get("http://localhost:9000/getUserById", {
                                params: { _id: item.user_id },
                            });
                            return { ...item, user: userResponse.data }; 
                        } catch (error) {
                            console.error(`Error fetching user for user_id: ${item.user_id}`, error);
                            return { ...item, user: null };                         }
                    })
                );

                setVerifications(userDetails); 
                console.log("Enriched Verifications:", userDetails);
            } catch (error) {
                console.error("Error fetching verifications:", error);
            }
        };

        fetchVerifications(); 
    }, []); 

    const handleApprove = async (userId) => {
        try {
            await axios.post(`http://localhost:9000/approveUser`, { 
                _id: userId 
            });
            alert("User approved successfully!");

            setVerifications((prevVerifications) =>
                prevVerifications.filter((application) => application._id !== userId)
            );
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Failed to approve user.");
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:9000/deleteVerificationRequest`,{
                _id: userId 
            });
            alert("User deleted successfully!");

            setVerifications((prevVerifications) =>
                prevVerifications.filter((application) => application._id !== userId)
            );
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="admin-home-container">
                <div className="users-list">
                    <h2>Users to Verify</h2>
                    {verifications.length > 0 ? (
                        verifications.map((application) => (
                            <div key={application._id} className="user-item">
                                <div className="user-details">
                                    <p><strong>Name:</strong> {application.user?.username || "Unknown"}</p>
                                    <p><strong>Email:</strong> {application.user?.email || "Unknown"}</p>
                                    <p><strong>Description:</strong> {application?.description || "Unknown"}</p>
                                </div>
                                <div className="action-buttons">
                                    <button 
                                        className="approve-button" 
                                        onClick={() => handleApprove(application.user._id)}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete(application._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-users">No users to verify.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export default AdminHome;
