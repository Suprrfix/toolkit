const express=require('express');
const request = require('request');

const userController=require('./controllers/userController');
const garageController=require('./controllers/garageController');
const checkInController=require('./controllers/checkInController');
const customerController=require('./controllers/customerController');
const checkOutController=require('./controllers/checkOutController');

module.exports =function(app)
{
	const apiRoutes=express.Router();

	app.use('/api',apiRoutes);
	
	apiRoutes.post('/login',userController.loginApi);

	apiRoutes.get('/garages',garageController.garagesApi);
	apiRoutes.get('/garage/:id/details',garageController.garageDetailsApi);
	apiRoutes.post('/create/garage',garageController.createGarageApi);

	apiRoutes.post('/create/check_in',checkInController.createCheckIn);
	apiRoutes.get('/check_in/:id/details',checkInController.checkInDetails);
	apiRoutes.get('/incomplete_checkins/:id',checkInController.incompleteCheckIns);
	apiRoutes.post('/create/bill/items',checkInController.createBillItems);

	apiRoutes.post('/create/owner',userController.createOwnerApi);
	apiRoutes.post('/create/customer',customerController.createCustomerApi);

	apiRoutes.post('/create/check_out',checkOutController.createCheckOutApi);




}