import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import { axiosInstance } from "../../Api/axios";
import {db} from "../../Utilty/firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utilty/action.type";
function Payment() {
  const { state,dispatch } = useContext(DataContext);
  const basket = state.basket;
  const user = state.user;
  const totalItem = basket?.reduce((total, item) => {
    return total + (item.amount ?? 1);
  }, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate =useNavigate()
  const handleChange = (e) => {
    setCardError(e.error?.message || "");
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setCardError("Stripe is not loaded yet. Please try again later.");
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCardError("Card input is not available.");
      return;
    }
    try {
      setProcessing(true);
      const response = await axiosInstance.post(
        `/payment/create?total=${total.toFixed(2)}`
      );

      const clientSecret = response.data?.clientSecret;
      if (!clientSecret) {
        throw new Error("No client secret returned from payment intent.");
      }
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      console.log(confirmation);
      if (confirmation.error) {
        setCardError(confirmation.error.message);
      } else if (
        confirmation.paymentIntent &&
        confirmation.paymentIntent.status === "succeeded"
      ) {
        alert("Payment succeeded!");
      }
      await setDoc(
        doc(
          collection(db, "users", user.uid, "orders"),
          confirmation.paymentIntent.id
        ),
        {
          basket: basket,
          amount: confirmation.paymentIntent.amount,
          created: confirmation.paymentIntent.created,
        }
      );
      // empty the basket
      dispatch({type:Type.EMPTY_BASKET})
      navigate("/orders",{state:{msg:"you have placed new Order"}})
    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>Checkout {totalItem} items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email ?? "Guest"}</div>
            <div>Addis-Ababa,Ethiopia</div>
            <div>Bole</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={item.id ?? index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="#000" size={12} />
                        <p>Please wait ... </p>
                      </div>
                    ) : (
                      " Pay Now "
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
