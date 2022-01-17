const {Question} = require('../models');
const {generateQuiz} = require('../lib/generateQuiz');

const getQuestionsList = function(req,res) {
    Question.find({}).exec(function(err,questionList){
        if (err){return err}
        res.render('questions',{questionList:questionList});
    });

}

const deleteQuestion = function(req,res){
    const id = req.params.id;
    Question.findByIdAndRemove(id).exec(()=>{
        res.redirect('/questions/list');
    })

}

const displayQuiz =  async function (req,res){
   
    const quiz = await generateQuiz();
    res.send(quiz);
    //res.render('quiz',{quiz:quiz});
}

module.exports ={
    getQuestionsList,
    deleteQuestion,
    displayQuiz

}