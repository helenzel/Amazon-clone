import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./Productdetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";
function Productdetail() {
  const { productId } = useParams();
  const [product, setproduct] = useState({});
  const [isLoading,setIsLoading]=useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setproduct(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false)
    })
  }, []);
  return (
    <Layout>
      {isLoading? (<Loader/>):(<ProductCard product={product}
      flex={true}
      renderDesc={true}
      renderAdd={true}
       />)}

    </Layout>
  );
}

export default Productdetail;
