const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');


app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.goi4lkk.mongodb.net/?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const bookSchema = new mongoose.Schema({
  title:String,
  cover:String,
  author:String
});

const bookModel = mongoose.model('books',bookSchema);

app.post('/api/book', (req,res)=>{
    console.log(req.body);

       bookModel.create({
        title:req.body.title,
        cover:req.body.cover,
        author:req.body.author
  })
    .then(
      ()=>{res.send("Data Recieved!")}
    )
    .catch(
      ()=>{res.send("Data NOT Recieved!")}
    )
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/books', async (req, res)=>{

  let books = await bookModel.find({});
  console.log(books)
  res.json(books);
})

app.get('/api/book/:id', async (req,res)=>{
  console.log(req.params.id);
  let book = await bookModel.findById({_id:req.params.id})
  res.send(book);
})
    
const data = [
    {
    "title": "Learn Git in a Month of Lunches",
    "isbn": "1617292419",
    "pageCount": 0,
    "thumbnailUrl":
    "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/umali.jpg", "status": "MEAP",
    "authors": ["Rick Umali"],
    "categories": []
    },
    {
    "title": "MongoDB in Action, Second Edition",
    "isbn": "1617291609",
    "pageCount": 0,
    "thumbnailUrl":
    "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/banker2.jpg",
    "status": "MEAP",
    "authors": [
    "Kyle Banker",
    "Peter Bakkum",
    "Tim Hawkins",
    "Shaun Verch",
    "Douglas Garrett"
    ],
    "categories": []
    },
    {
    "title": "Getting MEAN with Mongo, Express, Angular, and Node",
    "isbn": "1617292036",
    "pageCount": 0,
    "thumbnailUrl":
    "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/sholmes.jpg",
    "status": "MEAP",
    "authors": ["Simon Holmes"],
    "categories": []
    }
    ];

 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})