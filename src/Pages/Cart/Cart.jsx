import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import classes from "./Cart.module.css"
function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state;
  const total=basket.reduce((amount,item)=>
  item.price + amount
  ,0)
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {
            basket?.length=== 0 ?(<p>Oops !No item in your cart</p>):(basket.map((item,i)=>(
              <ProductCard
              key={i}
              product={item}
              renderDesc={true}
              renderAdd={false}
              flex={true}
              />
            ))
          )}
        </div>
      
          {basket?.length !==0 &&(
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({basket.length} items)</p>
                <CurrencyFormat amount={total}/>
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to='/payments'>Continue to checkout</Link>
            </div>
          )}
        
      </section>
    </Layout>
  );
}

export default Cart;
