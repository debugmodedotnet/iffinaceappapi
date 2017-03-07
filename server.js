// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');



var dataGenerator = require('./dataGenerator');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();         
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    var data = dataGenerator.generate(new Date());
    console.log(data);
    res.send(data);

});

router.get('/details', function(req, res) {

    var detaildata = dataGenerator.generateDetails(new Date());
    console.log(detaildata);
    res.send(detaildata); 
});

router.get('/griddata', function(req, res) {

    var data = dataGenerator.getDataForGrid();
    console.log(data);
    res.send(data);
});




app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
console.log();




