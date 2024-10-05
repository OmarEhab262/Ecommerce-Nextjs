import { List } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductItem = ({ product }) => {
  console.log("product banner: ", product?.banner?.url);
  return (
    <div className="border-2 border-transparent hover:border-2  p-1 hover:shadow-md rounded-lg cursor-pointer hover:border-teal-400">
      <Image
        className="h-[200px]  w-full object-fill rounded-t-lg"
        src={product?.banner?.url}
        alt="Product"
        width={400}
        height={350}
      />
      <div className="">
        <div className="flex justify-between items-center bg-gray-200 rounded-b-md p-3">
          <div>
            {" "}
            <h2 className="text-[16px] font-medium line-clamp-1 ">
              {product?.title}
            </h2>
            <h2 className="text-[14px] flex gap-2 items-center text-gray-400 font-medium ">
              <List className="w-4 h-4" />
              {product?.category}
            </h2>
          </div>
          <div>
            <h2>{product?.price} $</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
