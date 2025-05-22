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
  const [isLoding,setIsLoding]=useState(false)
  useEffect(() => {
    setIsLoding(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setproduct(res.data);
      setIsLoding(false)
    }).catch((err)=>{
      console.log(err);
      setIsLoding(false)
    })
  }, []);
  return (
    <Layout>
      {isLoding? (<Loader/>):(<ProductCard product={product} />)}
      <div>
        
      </div>
    </Layout>
  );
}

export default Productdetail;
