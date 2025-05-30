import React, { useContext,useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useElements, useStripe,CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
function Payment() {
  const { state } = useContext(DataContext);
  const basket = state.basket;
  const user = state.user;
  const totalItem = basket?.reduce((total, item) => {
    return total + (item.amount ?? 1);
  }, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const [cardError,setCardError]=useState(null)
  const stripe =useStripe();
  const elements=useElements();
  const handleChange=(e)=>{
    setCardError(e.error?.message || "");
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
            <div>Addis Ababa,Ethiopia</div>
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
              <form action="">
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{display:"flex" , gap:"10px"}}>
                      <p>Total Order  </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>pay Now </button>
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
