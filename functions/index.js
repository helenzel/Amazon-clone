/* eslint-env node */
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
// const { ClientInfo } = require("firebase-functions/v1/testLab");
// const { default: Stripe } = require("stripe");
dotenv.config();
console.log("Stripe key loaded");
let stripe;
try {
  stripe = require("stripe")(process.env.STRIPE_KEY);
} catch (err) {
  console.error(" Failed to initialize Stripe:", err.message);
}
const app = express();
const corsOptions = cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !",
  });
});
app.post("/payment/create", corsOptions, async (req, res) => {
  const totalParam = req.query.total;
  const total = Math.round(parseFloat(totalParam) * 100);
  console.log("Received totalParam:", totalParam);
  console.log("Converted total (cents):", total);

  if (isNaN(total) || total <= 0) {
    return res.status(403).json({
      message: "total must be greater than 0",
    });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

exports.api = functions.https.onRequest(app);
