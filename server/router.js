const express=require('express');
const request = require('request');
const userController=require('./controllers/userController');
module.exports =function(app)
{
	const apiRoutes=express.Router();

	console.log("====router----");

	app.use('/api',apiRoutes);
	apiRoutes.post('/login',userController.loginApi);	
}