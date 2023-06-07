import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Card } from "react-bootstrap";
import EditProfile from "../editprofile/editprofile";
import "./admindashboard.css";
import logo from '../logo.png'

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

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please authenticate.");
        return;
      }

      await axios.delete(`http://localhost:5000/user/api/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Error while deleting user: ", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="ml-2">Admin Dashboard</h1>
        {/* <h2>Admin Dashboard</h2> */}
        <button type="button" className="btn btn-dark" id="logoutbtn" onClick={logout}>
          Logout
        </button>
      </div>
      <br />
      <br />
      <div className="user-grid">
        {users.map((user) => (
          <Card key={user._id} className="user-card">
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Role: {user.role}</Card.Text>
              <div className="user-actions">
                <Button variant="primary" onClick={() => handleEdit(user._id)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      {selectedUser && (
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
      )}
    </div>
  );
}

export default AdminDashboard;
