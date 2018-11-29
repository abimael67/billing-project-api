const express = require('express');
const router = express.Router();


const ArticleController = require('../controllers/articleController');


/* Routes */
router.post("/insert", ArticleController.insert_article);
router.get("/get", ArticleController.get_articles);
router.post("/toggle_status", ArticleController.toggle_article_status);
router.put("/update", ArticleController.update_article);

module.exports = router;