import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ productList }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 ">
      {productList.map((product) => {
        return <ProductItem product={product} key={product?.id} />;
      })}
    </div>
  );
};

export default ProductList;
