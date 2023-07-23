const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const router = require('./router');

var port=3001;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
router(app);

app.listen(port);
console.log('your server is running on port '+ port +'.');