const express = require('express');
const router = express.Router();


const CustomerController = require('../controllers/customerController');


/* Routes */
router.post("/insert", CustomerController.insert_customer);
router.get("/get", CustomerController.get_customers);
router.post("/toggle_status", CustomerController.toggle_customer_status);
router.put("/update", CustomerController.update_customer);
module.exports = router;