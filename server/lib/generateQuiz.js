const {Question} = require('../models');


const generateQuiz = async function(n) {
    //let quizAgg = Question.aggregate().sample(10);
    //console.log(typeof quiz)
    const quiz = await Question.aggregate().sample(n).exec();
    //console.log(quiz);
    return quiz
}


module.exports = {
    generateQuiz
}