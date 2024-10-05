import Image from "next/image";
import React from "react";

const ProductBanner = ({ product }) => {
  const bannerUrl = product?.attributes?.banner?.data?.attributes?.url;
  console.log("product banner URL: ", bannerUrl);

  return (
    <div>
      {bannerUrl ? (
        <Image
          src={bannerUrl}
          alt="Banner"
          width={500}
          height={350}
          className="rounded-lg"
        />
      ) : (
        <p>No banner available</p>
      )}
    </div>
  );
};

export default ProductBanner;
