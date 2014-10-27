var express = require('express');
var stripe = require('stripe')("sk_test_Ec1UzFOy7ATlFhS7hXSIAFKc");
var bodyParser = require ('body-parser');
var port = 9555;

var app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser());

app.post('/charge', function(req, res) {
  var stripeToken = req.body.stripeToken;
  var charge = stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    card: stripeToken,
    description: 'charge from site'
  }, function(err, charge) {
    if (!err) {
      return res.redirect('/thank-you.html');
    } else {
      return res.redirect('/payment-error.html');
    }
  })
});

app.listen(port);