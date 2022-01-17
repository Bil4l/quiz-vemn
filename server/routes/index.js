const express = require('express');
const {questionController} = require('../controllers');

const router = express.Router();

router.get('/list',function(req,res){
    questionController.getQuestionsList(req,res);
});

router.get("/delete/:id",function(req,res){
    questionController.deleteQuestion(req,res);
});

router.get('/quiz', function(req,res){
    questionController.displayQuiz(req,res);
});
module.exports = router;