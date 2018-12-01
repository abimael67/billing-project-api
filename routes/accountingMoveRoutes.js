const express = require('express');
const router = express.Router();


const AccountingMoveController = require('../controllers/accountingMoveController');


/* Routes */
router.post("/insert", AccountingMoveController.insert_accounting_move);
router.get("/get", AccountingMoveController.get);

module.exports = router;