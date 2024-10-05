import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[25px] font-bold">{product?.attributes?.title}</h2>

      <h2 className="text-[17px] text-gray-500">
        {product?.attributes?.category}
      </h2>

      <h2 className="text-[19px]">{product?.attributes?.description}</h2>
      <h2 className="text-[13px] text-gray-500 flex gap-2">
        {product?.attributes?.instantDelivery ? (
          <BadgeCheck color="#10B981" />
        ) : (
          <AlertOctagon color="#EF4444" />
        )}
        Eligible For Instant Delivery
      </h2>
      <h2 className="text-[40px] mt-3 font-bold text-primary">
        ${product?.attributes?.price}
      </h2>

      <button className="w-fit flex items-center justify-between gap-4 mt-4 rounded bg-primary px-8 py-3 text-sm font-medium text-white shadow hover:bg-teal-500 focus:outline-none focus:ring active:bg-red-500">
        <ShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
