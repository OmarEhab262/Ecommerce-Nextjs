import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ productList }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
      {productList.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
