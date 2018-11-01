const express = require('express');
const router = express.Router();

const SellerController = require('../controllers/sellerController');

/* Routes */
router.post("/insert", SellerController.insert_seller);
router.get("/get", SellerController.get_sellers);
router.post("/toggle_status", SellerController.toggle_seller_status);
router.put("/update", SellerController.update_seller);
module.exports = router;