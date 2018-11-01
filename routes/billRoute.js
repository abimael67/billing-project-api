const express = require('express');
const router = express.Router();


const BillController = require('../controllers/billController');


/* Routes */
router.post("/insert", BillController.insert_bill);
router.get("/get", BillController.get_bills);
router.put("/update", BillController.update_bill);
module.exports = router;