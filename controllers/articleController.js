
require('../config/config');

const {Article} = require('../models/articleModel');


module.exports.insert_article = (req, res, next) => {
    var body = req.body
    var newArticle = new Article({description:body.description, unit_price:body.unit_price});

    newArticle.save().then(() => {
        res.status(200).json(newArticle.toObject());
        console.log('*** newArticle --> ', newArticle.toObject());
    }).catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.get_articles = (req, res, next) => {
    let criteria = {status : 'Active'}
    if(req.query.showInactives === 'true')
        criteria = {}
    if(req.query.desc)
        criteria = Object.assign({}, criteria, {description: { '$regex' : req.query.desc, '$options' : 'i' }})
    Article.find(criteria)
    .exec()
    .then(articleList => {
        if (articleList) {
            res.status(200).json({
                count: articleList.length,
                data: articleList
            });
        }
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
};

module.exports.toggle_article_status = (req, res, next) => {    
    var articleToToggleId = req.body._id;
    console.log('*** article --> ',articleToToggleId);
    Article.findOne({'_id':articleToToggleId})
    .exec()
    .then(article => {
        if(!article){
            res.status(400).json({message: "Article does not exists."});
            return;
        }
        if(article.status === 'Active')
            article.status = "Inactive"
        else
            article.status = "Active"      
        article.save()
        .then(() => {
            var articleToggled = {description: article.description};
            res.status(200).json({
                message: "Article status has been toggled.",
                status: article.status,
                article: articleToggled
            });
            console.log('*** article --> ', article.toObject());
        });
    })
    .catch(err => {
        res.status(400).json(err.toObject);
        console.log(err);
    });
};


module.exports.update_article = (req, res, next) => {    
    var articleId = req.body._id;
    Article.findByIdAndUpdate(articleId, {description: req.body.description, unit_price:req.body.unit_price})
    .lean()
    .select('-__v')    
    .exec()
    .then(article => {
        if(!article){
            res.status(400).json({message: "Article does not exists."});
            return;
        }
        Object.assign(article, article, req.body)
        console.log('*** article --> ', article);
        res.status(200).json(article);
    })
    .catch(err => {
        res.status(400).json(err.toObject);
        console.log(err);
    });
};

