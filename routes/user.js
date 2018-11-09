const express = require('express');
const userRouter = express.Router();
const userList = require('../views/userList');
const {User, Page} = require('../models')
const userPage = require('../views/userPages');

userRouter.use(express.urlencoded({extended:false}));

userRouter.get('/', async (req,res)=>{
  const listOfUsers = await User.findAll();
  res.send(userList(listOfUsers));
})

userRouter.get('/:id', async (req,res)=>{
  const foundUser = await User.findOne({
    where: {id: req.params.id}
  })
  const usersPages = await Page.findAll({
    where: {authorId: foundUser.id}
  })
  res.send(userPage(foundUser, usersPages));
})

module.exports = userRouter;
