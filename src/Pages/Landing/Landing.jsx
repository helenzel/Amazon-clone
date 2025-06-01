import React from "react";
import Layout from "../../components/Layout/Layout";
import CarouselEffect from "../../components/Carousel/carouselEffect";
import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
