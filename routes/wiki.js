const express = require('express');
const {Page} = require('../models');
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
  const page = new Page({
    title: req.body.title,
    content: req.body['page-content'],
    status: req.body['page-status']
  })
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
  res.send(wikiPage(foundPage));
})

module.exports = wikiRouter;
