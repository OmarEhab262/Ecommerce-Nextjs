"use client";

import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductApis from "../_utils/ProductApis";

const ProductSection = () => {
  const [productList, setProductList] = useState([]);
  console.log("productList: ", productList);
  const getLatestProducts_ = () => {
    ProductApis.getLatestProducts().then((res) => {
      setProductList(res.data.data);
    });
  };

  useEffect(() => {
    getLatestProducts_();
  }, []);
  return (
    <>
      <div className="px-10 md:px-20">
        <h2>Our Latest Products </h2>
        <ProductList productList={productList} />
      </div>
    </>
  );
};

export default ProductSection;
