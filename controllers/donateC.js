const router = require('express').Router();


const stripe = require('stripe')('sk_test_qXkk2PngAuqzT3zpGEJxgQ8k00bzHEVimA');


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