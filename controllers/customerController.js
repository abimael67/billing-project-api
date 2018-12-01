
require('../config/config');

const {Customer} = require('../models/customerModel');


module.exports.insert_customer = (req, res, next) => {
    var body = req.body
    var newCustomer = new Customer({name:req.body.name, identification:req.body.identification, account:req.body.account});

    newCustomer.save().then(() => {
        res.status(200).json(newCustomer.toObject());
        console.log('*** newCustomer --> ', newCustomer.toObject());
    }).catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.get_customers = (req, res, next) => {
    let criteria = {}  
    if(req.query.name)
        criteria = Object.assign({}, criteria, {name: { '$regex' : req.query.name, '$options' : 'i' }})
    if(req.query.id)
        criteria = Object.assign({}, criteria, {identification: { '$regex' : req.query.id, '$options' : 'i' }})
    if(req.query._id)
        criteria = Object.assign({}, criteria, {_id: req.query._id})
    Customer.find(criteria)
    .exec()
    .then(customerList => {
        if (customerList) {
            res.status(200).json({
                count: customerList.length,
                data: customerList
            });
        }
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.toggle_customer_status = (req, res, next) => {    
    var customerToToggleId = req.body._id;
    console.log('*** customer --> ',customerToToggleId);
    Customer.findOne({'_id':customerToToggleId})
    .exec()
    .then(customer => {
        if(!customer){
            res.status(400).json({message: "Customer does not exists."});
            return;
        }
        if(customer.status === 'Active')
            customer.status = "Inactive"
        else
            customer.status = "Active"      
        customer.save()
        .then(() => {
            var customerToggled = {description: customer.name};
            res.status(200).json({
                message: "Customer status has been toggled.",
                status: customer.status,
                customer: customerToggled
            });
            console.log('*** customer --> ', customer.toObject());
        });
    })
    .catch(err => {
        res.status(400).json(err.toObject);
        console.log(err);
    });
};


module.exports.update_customer = (req, res, next) => {    
    var customerId = req.body._id;
    Customer.findByIdAndUpdate(customerId, req.body)
    .lean()
    .select('-__v')    
    .exec()
    .then(customer => {
        if(!customer){
            res.status(400).json({message: "Customer does not exists."});
            return;
        }
        Object.assign(customer, customer, req.body)
        console.log('*** customer --> ', customer);
        res.status(200).json(customer);
    })
    .catch(err => {
        res.status(400).json(err.toObject);
        console.log(err);
    });
};
