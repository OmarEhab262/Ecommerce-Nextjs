import { List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product }) => {
  const bannerUrl = product?.attributes?.banner?.data?.attributes?.url;

  return (
    <Link
      href={`/product-details/${product?.id}`}
      S
      className="border-2 border-transparent hover:border-2 p-1 hover:shadow-md rounded-lg cursor-pointer hover:border-teal-400"
    >
      {bannerUrl ? (
        <Image
          className="h-[200px] w-full object-fill rounded-t-lg"
          src={bannerUrl}
          alt="Product"
          width={400}
          height={350}
        />
      ) : (
        <div className="h-[200px] w-full bg-gray-200 rounded-t-lg flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="">
        <div className="flex justify-between items-center bg-gray-200 rounded-b-md p-3">
          <div>
            <h2 className="text-[16px] font-medium line-clamp-1">
              {product?.attributes?.title}
            </h2>
            <h2 className="text-[14px] flex gap-2 items-center text-gray-400 font-medium">
              <List className="w-4 h-4" />
              {product?.attributes?.category}
            </h2>
          </div>
          <div>
            <h2 className="text-[14px]">
              <span className="text-green-600 font-medium">$</span>
              {product?.attributes?.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
