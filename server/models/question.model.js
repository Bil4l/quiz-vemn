const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    statement: String,
    answer: String,
    category: String
});


const Question = mongoose.model('Question',questionSchema);

module.exports = Question;