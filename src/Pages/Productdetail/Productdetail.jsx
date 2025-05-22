import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./Productdetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
function Productdetail() {
  const { productId } = useParams();
  const [product, setproduct] = useState({});
  useEffect(() => {
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setproduct(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }, []);
  return (
    <Layout>
      <div>
      <ProductCard
      product={product}
       />
      </div>
    </Layout>
  );
}

export default Productdetail;
