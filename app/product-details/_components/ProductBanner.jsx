import Image from "next/image";
import React from "react";

const ProductBanner = ({ product }) => {
  const bannerUrl = product?.attributes?.banner?.data?.attributes?.url;

  return (
    <div>
      {bannerUrl ? (
        <>
          <Image
            src={bannerUrl}
            alt="Banner"
            width={500}
            height={350}
            className="rounded-lg"
          />
        </>
      ) : (
        <div className="w-[500px] h-[281px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
