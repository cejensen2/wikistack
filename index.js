const express = require('express');
const morgan = require('morgan');
const views = require('./views')
const models = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res)=>{
  res.send(views.layout(''));
})

const PORT = 5000;

const init = async () =>{
  await models.db.sync();
  app.listen(PORT, ()=>{
    console.log(`App listening in port ${PORT}`);
  })
}

init();

models.db.authenticate().then(()=>{
  console.log('connected to database')
})
