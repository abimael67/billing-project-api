
require('../config/config');

const {AccountingMove} = require('../models/accountingMoveModel');
const {Bill} = require('../models/billModel');

module.exports.get = (req, res, next) => {
    let criteria = {}  
    if(req.query._id)
        criteria = Object.assign({}, criteria, {_id:req.query._id })
    AccountingMove.find(criteria)
    .exec()
    .then(accList => {
        if (accList) {
            res.status(200).json({
                count: accList.length,
                data: accList
            });
        }
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.insert_accounting_move = async (req, res, next) => {   
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    await AccountingMove.deleteMany({date: {$gte: startOfToday}}, ()=>{})
    await Bill.find().populate("customer").populate("seller").exec( async function(err, bills){
        if(err) res.status(400).json(err)
        let details = []
        bills.forEach(async (b, i)=>{
            let total = b._doc.details.reduce((p, c)=>{
                return p+(c._doc.unit_price * c._doc.amount)
            },0)
            let customer = b._doc.customer._doc.name
            let customerAcc = b._doc.customer._doc.account
            let seller = b._doc.seller._doc.name
           details.push({customer:customer, account:customerAcc, seller:seller, total:total, moveType:'CR'})
        })

        let newAccountingMove = new AccountingMove(
            {
                description: "Movements for " + now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear(),aux:1,
                details:details
            }
        )
       await newAccountingMove.save((err, acc)=>{
            if(err) res.status(400).json(err)

            res.status(200).json(acc)
            next();   
        })

    })
   
};

