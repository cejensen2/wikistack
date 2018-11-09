const express = require('express');
const {Page} = require('../models');
const {User} = require('../models');
const homePage = require('../views/main');
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const wikiRouter = express.Router();

wikiRouter.use(express.urlencoded({extended:false}));

wikiRouter.get('/', async (req,res)=>{
  const pageList = await Page.findAll();
  res.send(homePage(pageList));
});

wikiRouter.post('/', async (req,res)=>{
  console.log(req.body);
  const page = new Page({
    title: req.body.title,
    content: req.body['page-content'],
    status: req.body['page-status']
  })
  const pageAuthor = await User.findOne({
    where: {name: `${req.body['author-name']}`}
  })
  if(pageAuthor === null){
    const author = new User({
      name: req.body['author-name'],
      email: req.body['author-email']
    });
    await author.save();
    page.authorId = author.id;
  } else {
    page.authorId = pageAuthor.id;
  }
  await page.save();
  res.redirect(`${page.slug}`);
});

wikiRouter.get('/add', (req,res)=>{
  res.send(addPage());
});

wikiRouter.get('/:slug', async (req, res)=>{
  const foundPage = await Page.findOne({
    where: {slug: `${req.params.slug}`}
  })
  const pageAuthor = await foundPage.getAuthor();
  res.send(wikiPage(foundPage, pageAuthor));
})

module.exports = wikiRouter;
