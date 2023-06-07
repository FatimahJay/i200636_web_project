// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Modal from "react-bootstrap/Modal";
// import Form from 'react-bootstrap/Form';
// import './managebrand.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import logo from '../logo.png';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useNavigate } from 'react-router-dom';

// function ManageBrand() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [brands, setBrands] = useState([]);
//   const [updatedPostId, setUpdatedPostId] = useState(null);
//   const [updatedPost, setUpdatedPost] = useState({
//     name: '',
//     logo: '',
//     description: '',
//     contact: ''
//   });
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const fetchBrands = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const options = {
//           headers: { Authorization: `Bearer ${token}` }
//         };
//         try {
//           const response = await axios.get('http://localhost:5000/brand/api/', options);
//           setBrands(response.data);
//         } catch (error) {
//           console.error('Error while fetching brands:', error);
//         }
//       } else {
//         alert('Please authenticate.');
//       }
//     };

//     fetchBrands();
//   }, []);

//   const filteredBrands = brands.filter((brand) =>
//     brand.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const signOut = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   const deleteBrand = async (id) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const options = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       };
//       try {
//         await axios.delete(`http://localhost:5000/brand/api/deleteBrand/${id}`, options);
//         alert('Brand has been deleted.');
//         // Refresh brands list
//         const response = await axios.get('http://localhost:5000/brand/api/', options);
//         setBrands(response.data);
//       } catch (error) {
//         console.error('Error while deleting brand:', error);
//       }
//     } else {
//       alert('Please authenticate.');
//     }
//   };

//   const updatePost = (id, name, logo, description, contact) => {
//     setUpdatedPostId(id);
//     setUpdatedPost({
//       name: name,
//       logo: logo,
//       description: description,
//       contact: contact
//     });
//     setShow(true);
//   };

//   const handleClose = () => {
//     setShow(false);
//   };

//   const saveUpdatedPost = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const options = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       };
//       try {
//         await axios.patch(`http://localhost:5000/brand/api/updateBrand/${updatedPostId}`, updatedPost, options);
//         alert('Brand has been updated.');
//         setShow(false);
//         // Refresh brands list
//         const response = await axios.get('http://localhost:5000/brand/api/', options);
//         setBrands(response.data);
//       } catch (error) {
//         console.error('Error while updating brand:', error);
//       }
//     } else {
//       alert('Please authenticate.');
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdatedPost({ ...updatedPost, [name]: value });
//   };

//   return (
//     <>
//       <Navbar bg="light" expand="lg" className="navbar">
//         <Navbar.Brand>
//           <img src={logo} alt="Logo" className="logo" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <LinkContainer to="/admindashboard">
//               <Nav.Link>Admin Dashboard</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/viewBrand">
//               <Nav.Link>Manage Brand</Nav.Link>
//             </LinkContainer>
//             <Nav.Link onClick={signOut}> LogOut</Nav.Link>
//           </Nav>
//           <Form inline>
//             <Form.Control
//               type="text"
//               placeholder="Search brand"
//               className="mr-sm-2"
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Form>
//         </Navbar.Collapse>
//       </Navbar>

//       <div className="container">
//         <h2 className="brand-heading">Manage Brands</h2>

//         {filteredBrands.length > 0 ? (
//           filteredBrands.map((brand) => (
//             <Card key={brand._id} className="brand-card">
//               <Card.Img variant="top" src={brand.logo} className="brand-logo" />
//               <Card.Body>
//                 <Card.Title>{brand.name}</Card.Title>
//                 <Card.Text>{brand.description}</Card.Text>
//                 <Card.Text>{brand.contact}</Card.Text>
//                 <Button variant="primary" onClick={() => updatePost(brand._id, brand.name, brand.logo, brand.description, brand.contact)}>
//                   Edit
//                 </Button>
//                 <Button variant="danger" onClick={() => deleteBrand(brand._id)}>
//                   Delete
//                 </Button>
//               </Card.Body>
//             </Card>
//           ))
//         ) : (
//           <p>No brands found.</p>
//         )}
//       </div>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Brand</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" name="name" value={updatedPost.name} onChange={handleInputChange} />
//             </Form.Group>
//             <Form.Group controlId="formLogo">
//               <Form.Label>Logo URL</Form.Label>
//               <Form.Control type="text" name="logo" value={updatedPost.logo} onChange={handleInputChange} />
//             </Form.Group>
//             <Form.Group controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control as="textarea" rows={3} name="description" value={updatedPost.description} onChange={handleInputChange} />
//             </Form.Group>
//             <Form.Group controlId="formContact">
//               <Form.Label>Contact</Form.Label>
//               <Form.Control type="text" name="contact" value={updatedPost.contact} onChange={handleInputChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//   <Button variant="secondary" onClick={handleClose}>
//     Close
//   </Button>
//   <Button variant="primary" onClick={saveUpdatedPost}>
//     Save Changes
//   </Button>
// </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ManageBrand;
