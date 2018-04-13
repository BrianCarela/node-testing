var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // changed ejs to html for html files, but it looks for the module, so that's fucked.


// app.set('audio', __dirname + '/audio'); // this wasn't working

// const audio = require('./audio'); // testing something - this is treated as a module, and does not register the same way that a controller would. This method of testing failed
// app.use('/audio', audio); // testing something

// declare audio directory to be used as a store for static files
app.use('/audio', express.static(__dirname + '/audio'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
