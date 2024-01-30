import "dotenv/config";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use("/", (req, res) => {
  res.json({
    message: "coming soon..",
  });
});

app.post("/create-payment-intent", async (req, res) => {
  //process.env.STRIP_SECRET
  const { amount, currency, payMethodType } = req.body;
  const stripe = new Stripe(process.env.STRIP_SECRET);

  // use stripe sdk to do config with private key
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency,
    payment_method_types: [],
  });
  console.log(paymentIntent);
  //use skd to create new intent
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
  // return intent id
});

app.post("/", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("server is running at port " + PORT);
});
