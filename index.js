const express = require('express');
const morgan = require('morgan');
const views = require('./views')
const {db} = require('./models')

const app = express();

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res)=>{
  res.send(views.layout(''));
})

const PORT = 5000;

app.listen(PORT, ()=>{
  console.log(`App listening in port ${PORT}`);
})

db.authenticate().then(()=>{
  console.log('connected to database')
})
