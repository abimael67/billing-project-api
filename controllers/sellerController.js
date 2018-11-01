
require('../config/config');

const {Seller} = require('../models/sellerModel');


module.exports.insert_seller = (req, res, next) => {
    var body = req.body
    var newSeller = new Seller(body);

    newSeller.save().then(() => {
        res.status(200).json(newSeller.toObject());
        console.log('*** newSeller --> ', newSeller.toObject());
    }).catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.get_sellers = (req, res, next) => {
    Seller.find({})
    .exec()
    .then(sellerList => {
        if (sellerList) {
            res.status(200).json({
                count: sellerList.length,
                data: sellerList
            });
        }
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.toggle_seller_status = (req, res, next) => {    
    var sellerToToggleId = req.body._id;
    console.log('*** seller --> ',sellerToToggleId);
    Seller.findOne({'_id':sellerToToggleId})
    .exec()
    .then(seller => {
        if(!seller){
            res.status(400).json({message: "Seller does not exists."});
            return;
        }
        if(seller.status === 'Active')
            seller.status = "Inactive"
        else
            seller.status = "Active"      
        seller.save()
        .then(() => {
            var sellerToggled = {description: seller.name};
            res.status(200).json({
                message: "Seller status has been toggled.",
                status: seller.status,
                seller: sellerToggled
            });
            console.log('*** seller --> ', seller.toObject());
        });
    })
    .catch(err => {
        res.status(400).json(err.toObject);
        console.log(err);
    });
};


module.exports.update_seller = (req, res, next) => {    
    var sellerId = req.body._id;
    Seller.findByIdAndUpdate(sellerId, req.body)
    .lean()
    .select('-__v')    
    .exec()
    .then(seller => {
        if(!seller){
            res.status(400).json({message: "Seller does not exists."});
            return;
        }
        Object.assign(seller, seller, req.body)
        console.log('*** seller --> ', seller);
        res.status(200).json(seller);
    })
    .catch(err => {
        res.status(400).json(err.toObject);
        console.log(err);
    });
};