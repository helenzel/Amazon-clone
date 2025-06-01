import React, { useContext,useState ,useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import {db} from "../../Utilty/firebase"
import { DataContext } from "../../components/DataProvider/DataProvider";
import classes from "./Orders.module.css"
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import ProductCard from "../../components/Product/ProductCard";
function Orders() {
  const{state,dispatch}=useContext(DataContext);
  const user=state.user;
  const[orders,setOrders]=useState([])
//   useEffect(()=>{
// if(user){
//   db.collection("users").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
//     console.log(snapshot);
//   })


// }else{

// }
//   },[]);
useEffect(() => {
  if (user) {
    const ordersQuery = query(
      collection(doc(db, "users", user.uid), "orders"),
      orderBy("created", "desc")
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      console.log(snapshot);
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setOrders(newOrders);
    });

    return () => unsubscribe();
  }
}, [user]);
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {/* ordered items */}
          <div>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className={classes.order}>
                  <p>Order ID: {order.id}</p>
                  <div className={classes.products_flex}>
                    {order.data.basket?.length > 0 ? (
                      order.data.basket.map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                      ))
                    ) : (
                      <p>No products in this order.</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
