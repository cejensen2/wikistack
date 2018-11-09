const express = require('express');
const morgan = require('morgan');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req,res)=>{
  res.redirect('/wiki');
})

app.get('/users', (req,res)=>{
  res.redirect('/users');
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
