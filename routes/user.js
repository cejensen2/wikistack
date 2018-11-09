const express = require('express');
const userRouter = express.Router();

userRouter.use(express.urlencoded({extended:false}));


module.exports = userRouter;
