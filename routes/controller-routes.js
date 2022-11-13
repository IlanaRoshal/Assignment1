const express = require("express");
const customersCRUD = require('../db/customers/customerCRUD');
const clothesCRUD = require('../db/clothes/clothesCRUD');
const router = express.Router();

// routes goes here
router.route('/customers/signup')
    .post(customersCRUD.InsertCustomer)

router.route('/customers/login')
    .post(customersCRUD.CheckCustomer)

router.route('/customers/update')
    .post(customersCRUD.UpdateCustomer)

router.route('/cloths')
    .get(clothesCRUD.getClothes)

router.route('/cloths/upload')
    .post(clothesCRUD.UploadCloth)

router.route('/cloths/search')
    .get(clothesCRUD.searchClothes)

router.route('/clothes/delete')
    .post(clothesCRUD.deleteClothes)

module.exports = router;