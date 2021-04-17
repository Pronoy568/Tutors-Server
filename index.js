const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hhkzw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()


app.use(bodyParser.json());
app.use(cors());

const port = 5050;

app.get('/', function (req, res) {
    res.send('done')
  })

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const studentsCollection = client.db("tutors").collection("students");
  const teachersCollection = client.db("tutor").collection("teachers");
  const serviceCollection = client.db("tutorAss").collection("service");
  const reviewCollection = client.db("tutorReview").collection("review");
 
  app.get('/reviews', (req, res) => {
    reviewCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

  app.post('/addReview', (req, res) => {
      const review = req.body;
      console.log(review);
      reviewCollection.insertOne(review)
          .then(result => {
              res.send(result.insertedCount > 0)
          })
    });
  

 
  app.get('/services', (req, res) => {
    serviceCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

  app.post('/addService', (req, res) => {
      const service = req.body;
      console.log(service);
      serviceCollection.insertOne(service)
          .then(result => {
              res.send(result.insertedCount > 0)
          })
    });
  

  app.get('/teachers', (req, res) => {
    teachersCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

  app.post('/addTeacher', (req, res) => {
      const teacher = req.body;
      console.log(teacher);
      teachersCollection.insertOne(teacher)
          .then(result => {
              res.send(result.insertedCount > 0)
          })
    });
  
  
  app.post('/addStudent', (req, res) => {
    const student = req.body;
    console.log(student);
    studentsCollection.insertOne(student)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    });

  app.get('/Students', (req, res) => {
    studentsCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })
    
   
  app.post('/selectedByDate', (req, res) => {
    const date = req.body;
    console.log(date.date); 
    studentsCollection.find({date: date.date})
            .toArray((err, documents) => {
                res.send(documents);
            })
         }) 

});


app.listen(process.env.PORT || port)
