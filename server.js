const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51RPyZ2SJVBTeSiZ9HWfAjRFtecKutxzkOjEOyem1RKZqNphXVX5XVe8zViOPeZCHDheF17NVtDnwoQiGpFgzWduI00jgQDac5z');

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pro Plan',
            description: 'Access to all premium features',
          },
          unit_amount: 2900, // $29.00
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5500/success.html',
      cancel_url: 'http://localhost:5500/cancel.html',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Stripe server running on http://localhost:4242'));
