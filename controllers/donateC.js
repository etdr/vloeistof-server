const router = require('express').Router();


const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);


router.post('/', async (req, res) => {
  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
    });


    res.json({clientSecret:paymentIntent.client_secret});

  } catch (err) {
    res.status(500).json({message:err.message})
  }

});








module.exports = router;