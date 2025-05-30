import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./src/Pages/Landing/Landing";
import Auth from "./src/Pages/Auth/Auth";
import Payment from "./src/Pages/Payment/Payment";
import Orders from "./src/Pages/Orders/Orders";
import Cart from "./src/Pages/Cart/Cart";
import Results from "./src/Pages/Results/Results";
import Productdetails from "./src/Pages/Productdetail/Productdetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51RTjoN060Ej1PQqdRMRXII54vWEn7diZm4hkSU5IsPxwom55A1FGKWuupB78MyhYsaIHgz2oSlnAfrjE1cbq9wCg00zjmD9MiK"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<Productdetails />} />
      </Routes>
    </Router>
  );
}

export default Routing;
