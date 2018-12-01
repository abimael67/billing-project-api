
require('../config/config');

const {Bill} = require('../models/billModel');


module.exports.insert_bill = (req, res, next) => {
    var body = req.body
    var newBill = new Bill(body);

    newBill.save().then(() => {
        res.status(200).json(newBill.toObject());
        console.log('*** newBill --> ', newBill.toObject());
    }).catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.get_bills = (req, res, next) => {
     let criteria = {}     
    if(req.query._id)
        criteria = Object.assign({}, criteria, {_id: req.query._id})
    Bill.find(criteria)
    .exec()
    .then(billList => {
        if (billList) {
            res.status(200).json({
                count: billList.length,
                data: billList
            });
        }
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.update_bill = (req, res, next) => {    
    var billId = req.body._id;
    Bill.findByIdAndUpdate(billId, req.body)
    .lean()
    .select('-__v')    
    .exec()
    .then(bill => {
        if(!bill){
            res.status(400).json({message: "Bill does not exists."});
            return;
        }
        Object.assign(bill, bill, req.body)
        console.log('*** bill --> ', bill);
        res.status(200).json(bill);
    })
    .catch(err => {
        res.status(400).json(err.toObject);
        console.log(err);
    });
};
