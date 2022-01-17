const mongoose = require('mongoose');
const {Question} = require('../models')
const {generateEntityList} = require('./query_test.js');

// Define our query and sources
const QUERY_COUNTRIES = `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://dbpedia.org/property/>

PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?cityLabel  (GROUP_CONCAT(DISTINCT ?paysLabel;separator="|" ) AS ?paysLabel) WHERE {
  ?city  a dbo:City;
  rdfs:label ?cityLabel;
  dbo:wikiPageWikiLink ?lien;
  dbo:country ?pays.
  ?pays rdfs:label ?paysLabel.
  FILTER (LANG(?cityLabel)='fr')
  FILTER (LANG(?paysLabel)='fr')
  } 
  GROUP BY ?cityLabel 
  HAVING (COUNT (DISTINCT ?lien) > 200)
  LIMIT 100`;


const QUERY_CITIES = `PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://dbpedia.org/property/>


SELECT ?paysLabel ?cityLabel  WHERE {
  ?pays  a dbo:Country;
  rdfs:label ?paysLabel;
  dbo:wikiPageWikiLink ?lien;
  dbo:capital ?city.
  ?city rdfs:label ?cityLabel.
  FILTER (LANG(?cityLabel)='fr')
  FILTER (LANG(?paysLabel)='fr')
  } 
  GROUP BY ?paysLabel ?cityLabel 
  HAVING (COUNT (DISTINCT ?lien) > 200)
  LIMIT 200`

const DBPEDIA = [
  { type: 'sparql', value: 'http://fr.dbpedia.org/sparql' },
];



const createQuestionsList = function (entityList,predicate) {
    let entitykeys = [];
    for (let key of entityList[0].keys()){
        entitykeys.push(key);
    }
    let questionList = new Array();
    for (entity of entityList){
        let question = new Map();
        question.set('statement', `${predicate} ${entity.get(entitykeys[0])} ?`);
        question.set('answer',`${entity.get(entitykeys[1])}`);
        questionList.push(question);
    }
    //console.log(questionList.length)
    return questionList;
}

const saveQuestionsList = function(res) {
  res.forEach(function(e){
    let question  = new Question({
      statement: e.get('statement'),
      answer: e.get('answer'),
      category: ""
    });
    question.save();
  })
};

generateEntityList(QUERY_CITIES,DBPEDIA)
.then((res)=>{
    return createQuestionsList(res,"Quelle est la capitale de ");
    //console.log(res);
})
.then((res)=>{
  saveQuestionsList(res);
})
.then(()=>{
  console.log("Saving questions done");
});

const uri = "mongodb+srv://adminquiz:quiz123@cluster0.5bddy.mongodb.net/quiz_db?retryWrites=true&w=majority";

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log("Connecté")});


const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error'));