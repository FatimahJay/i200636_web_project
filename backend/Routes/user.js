const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    editUser,
    deleteUser,
    getAllUsers
  } = require('../Controller/user');

const authMiddleware = require('../Middleware/Auth');


//for each route, add which role can access these routes
const routesRoles = {
  '/edit/:userId': ['admin'],
  '/delete/:userId': ['admin'],
  '/register': ['admin'],
  '/login': ['admin'],
  '/': ['admin']
}

//--------------------------- FOR ADMIN ------------------------------------ 1 account restriction to be added

  // Register admin
router.post('/register', registerUser);

// Login admin
router.post('/login', loginUser);


//------------------------- FOR ALL USERS ----------------------------------

//Edit a user
router.patch('/edit/:userId', authMiddleware(["admin"]), editUser);

// Get all users
router.get('/', authMiddleware(['admin']), getAllUsers);

router.delete('/delete/:userId', authMiddleware(['admin']), deleteUser);


module.exports = router;
  


