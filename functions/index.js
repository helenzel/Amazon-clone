const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express=require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const { ClientInfo } = require("firebase-functions/v1/testLab");
// const { default: Stripe } = require("stripe");
dotenv.config();
console.log("Stripe key loaded");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app=express()
app.use(cors({origin:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
      message:"Success !",
    });
   
});
app.post("/payment/create",async(req,res)=>{
    const total = req.query.total
    if(total>0){
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                amount:total,
                currency:"usd",
               });
               console.log(paymentIntent);
               res.status(201).json({
                clientSecret:paymentIntent.client_secret,
               });
        }catch(err){
            console.error("Stripe error:", err.message);
            res.status(500).json({ error: err.message });
        }
      
    }else{
        res.status(403).json({
            message:"total must be greater than 0",
        });   
    }
})


exports.api = onRequest(app);