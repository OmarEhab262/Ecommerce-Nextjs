"use client";
import { useContext } from "react";
import CartContext from "../_context/CartContext";
import Link from "next/link";

const Cart = ({ openCart, setOpenCart }) => {
  const [cart] = useContext(CartContext); // No need to setCart here; we're only reading from context
  console.log("cart: ", cart);

  return (
    <>
      {openCart && (
        <div className="z-50 h-[300px] w-[350px] bg-gray-100 rounded-md border shadow-sm absolute mx-10 right-5 top-[3.75rem] p-5 overflow-auto ">
          <button
            className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
            onClick={() => setOpenCart(false)}
          >
            <span className="sr-only">Close cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-4 space-y-6">
            <ul className="space-y-4">
              {cart?.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <img
                    src={
                      item?.attributes?.products?.data[0]?.attributes?.banner
                        ?.data?.attributes?.url ||
                      item?.product?.attributes?.banner?.data?.attributes?.url
                    }
                    alt="Product"
                    className="size-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">
                      {item?.product?.attributes?.title ||
                        item?.attributes?.products?.data[0]?.attributes?.title}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">
                          {item?.attributes?.products?.data[0]?.attributes
                            ?.category || item?.product?.attributes?.category}
                        </dt>
                      </div>
                      <div>
                        <dt className="inline">
                          {item?.attributes?.products?.data[0]?.attributes
                            ?.price || item?.product?.attributes?.price}
                        </dt>
                        <dd className="inline"> $</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 text-center">
              <Link
                href="/cart"
                onClick={() => setOpenCart(false)}
                className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
              >
                View my cart ({cart.length})
              </Link>
              <a
                href="#"
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              >
                Continue shopping
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
