const express = require('express');
const router = express.Router();
const brandController = require('../Controller/brand');
const authMiddleware = require('../Middleware/Auth');

router.patch('/updateBrand/:brandid',authMiddleware(['admin']), brandController.update); //edit a brand
router.get('/viewBrandbyseller/:sellerId', authMiddleware(['admin']), brandController.getAllBySeller); //view all brands of a seller
router.delete('/deleteBrand/:brandid', authMiddleware(['admin']), brandController.deleteBrand); //delete a brand
router.get('/',authMiddleware(['admin']), brandController.getAllbrands); //view all brands
module.exports = router;








































































