const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const router = require('./router');
const path = require('path'); 
var port=3001;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
router(app);

console.log(path.resolve(__dirname, '..', 'build'));

// Serve the static files from the 'build' directory
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Catch-all route to serve 'index.html' for client-side routing to work
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
  


app.listen(port);
console.log('your server is running on port '+ port +'.');
