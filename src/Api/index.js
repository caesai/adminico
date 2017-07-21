import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

app.post('/login', function(req,res) {
  let acccessResponse = {
      'access': 'failed'
  };
  if ((req.body.email == 'admin') &&(req.body.password == 'admin')) {
    acccessResponse.access = 'granted';
  }
  res.send(acccessResponse);
});

app.listen(3000, function () {
  console.log('Server maintanance listening on port 3000');
});
