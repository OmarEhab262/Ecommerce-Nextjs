import Image from "next/image";
import Link from "next/link";
import React from "react";

const PaymentConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 mt-4">
      <Image
        src="/giphy.webp"
        alt="Payment Confirmation"
        width={300}
        height={300}
      />
      <h2 className="text-[24px] mt-6">Payment Successful !</h2>
      <h2 className="text-[17px] text-center mt-6 text-gray-500">
        We sent an email with your order confirmation along with Digital Content
      </h2>
      <Link href="/" className="mt-6 text-white p-2 bg-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentConfirmation;
