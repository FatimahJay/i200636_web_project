import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import EditProfile from "../editprofile/editprofile";
import "./admindashboard.css"

function AdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please authenticate.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/user/api/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error while fetching users: ", error);
    }
  };

  const handleEdit = (userId) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
    fetchUsers();
  };

  const handleDelete = (userId) => {
    // Handle the delete action for the specific user
    console.log("Delete user:", userId);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
      <h2>Admin Dashboard</h2>
      <button type="button" className="btn btn-dark" id="logoutbtn" onClick={logout}>
                      Logout
                    </button>
      </div>
      <br></br>
      <br></br>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-primary btn-block btn-sm mr-2"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-block btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile
            usertoedit={selectedUser}
            setSelectedUser={setSelectedUser}
            handleCloseModal={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
