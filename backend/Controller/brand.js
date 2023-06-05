const Brand = require('../Models/brand');
const mongoose = require('mongoose');


const brandController = {

  //------------------------------------edit a brand----------------------------------
  async update(req, res) {
    
    const updates = Object.keys(req.body);
    //This line is creating an array of the keys from the body of the request. For example,
    //if the body of the request was { name: 'New Brand Name', logo: 'new_logo.png' },updates would be ['name', 'logo']
    const allowedUpdates = ['name', 'logo', 'description', 'contact'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    //This line checks if every key in the updates array is included in the allowedUpdates array. 
    //The every function returns true if all elements in the array pass the test implemented by the provided function, and false otherwise.

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });  //i.e. update action not allowed
    }

    try {

      // getting the seller id from the token
      // getting the brand id from the params
      
      const brandId = req.params.id;
      const sellerId = req.user._id;
      const userRole = req.user.role; 

      let brand;

      if (userRole === 'admin') {
        // if the user is an admin, they can update any brand
        brand = await Brand.findById(brandId);
      } else {
        // if the user is not an admin, they can only update brands they created
        brand = await Brand.findOne({ _id: brandId, seller: sellerId });
      }

      if (!brand) {
        return res.status(404).send({ error: 'Brand not found.' });
      }

      updates.forEach((update) => (brand[update] = req.body[update]));
      await brand.save();

      res.status(200).send(brand);
    } catch (error) {
      res.status(400).send({ error: 'Error updating brand.' });
    }
  },

  //view all brands of a seller
  async getAllBySeller(req, res) {
    try {
      const userRole = req.user.role;

      if (userRole === 'admin') {

         // Get the sellerId from the request parameters (provide it in teh route)
      const sellerId = req.params.sellerId;

    
      //The mongoose.Types.ObjectId.isValid(sellerId) function checks if the sellerId is a valid ObjectId. 
      //It returns true if the sellerId is a valid ObjectId and false otherwise

      if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        return res.status(400).send({ error: 'Invalid seller id.' });
      }

       // Find brands by the sellerId
       const brands = await Brand.find({ seller: sellerId });
      
      if (!brands) {
        return res.status(404).send({ error: 'No brands found for this seller.' });
      }
      res.status(200).send(brands);

    }

    } catch (error) {
      console.error(error); 
      res.status(500).send({ error: 'Error fetching brands.' });
    }
  }

}

module.exports = brandController;



































































































