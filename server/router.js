const express=require('express');
const request = require('request');
const userController=require('./controllers/userController');
module.exports =function(app)
{
	const apiRoutes=express.Router();
	app.use('/api',apiRoutes);
	apiRoutes.post('/login',userController.loginApi);	
}