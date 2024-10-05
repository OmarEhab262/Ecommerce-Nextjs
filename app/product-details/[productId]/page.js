"use client";

import React, { useEffect, useState } from "react";
import ProductApis from "../../_utils/ProductApis";
import BreadCrumbs from "../../_components/BreadCrumbs";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";

const ProductDetails = ({ params }) => {
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);
  const path = usePathname();
  console.log("path: ", path);
  // Function to fetch similar products excluding the current product
  const getProductListByCategory = (product) => {
    if (product?.attributes?.category && product?.id) {
      ProductApis.getProductByCategoryExcludingId(
        product?.attributes?.category,
        product?.id
      )
        .then((res) => {
          console.log("Product list", res?.data?.data);
          setProductList(res?.data?.data);
        })
        .catch((error) => {
          console.error("Error fetching product list:", error);
        });
    }
  };

  // Function to fetch product details by ID
  const getProductById_ = () => {
    ProductApis.getProductById(params?.productId)
      .then((res) => {
        const productData = res?.data?.data;
        setProductDetails(productData);
        console.log("Product details", productData);

        // Fetch similar products after getting the product details
        getProductListByCategory(productData);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  };

  // Fetch product details when component mounts or when productId changes
  useEffect(() => {
    if (params?.productId) {
      getProductById_();
    }
  }, [params?.productId]);

  return (
    <div className="px-10 md:px-20 py-5 ">
      <BreadCrumbs path={path} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 my-5 justify-items-center items-center">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div className="mt-10">
        <h2 className="my-5 font-bold text-xl ">Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default ProductDetails;
