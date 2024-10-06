"use client";
import { useContext, useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import CartContext from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";

function Header() {
  const { user } = useUser();
  const [hideHeader, setHideHeader] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  const [showList, setShowList] = useState(false); // State to manage the list visibility
  const [openCart, setOpenCart] = useState(false);
  const getCartItems = () => {
    CartApis.getUserCart(user.primaryEmailAddress.emailAddress).then((res) => {
      console.log("response from cart items", res?.data?.data);
      setCart(res?.data?.data);
    });
  };

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  useEffect(() => {
    const path = window.location.pathname;
    setHideHeader(path === "/sign-in" || path === "/sign-up");
  }, [window.location.pathname]);

  if (hideHeader) {
    return null;
  }

  const toggleList = () => {
    setShowList((prev) => !prev); // Toggle the list visibility
  };

  return (
    <header className="bg-white shadow-md">
      <div className="mt-1 mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Explore
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className=" items-center gap-4 hidden md:block">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
                    href="/sign-in"
                  >
                    Login
                  </a>
                  <a
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-bg-teal-500 transition hover:text-teal-600/75 sm:block"
                    href="/sign-up"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <div className="flex relative items-center gap-5">
                  <div className="relative inline-flex">
                    <button
                      className="rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all"
                      type="button"
                      onClick={() => setOpenCart(!openCart)}
                    >
                      <ShoppingCart />
                    </button>
                    {cart?.length > 0 && (
                      <span className="absolute top-1.5 right-2.5 grid min-h-[20px] min-w-[20px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 text-xs text-white">
                        {cart?.length}
                      </span>
                    )}
                  </div>
                  {openCart && (
                    <Cart setOpenCart={setOpenCart} openCart={openCart} />
                  )}
                  <UserButton />
                </div>
              )}
            </div>

            {/* Profile List */}
            {showList && (
              <div className="absolute top-16 z-[70] right-10 mt-2 w-48 rounded-md bg-white shadow-lg">
                <ul className="py-2">
                  <li>
                    <div className="px-4 py-2 ">
                      {" "}
                      <UserButton />
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <div className="md:hidden block">
              <div className="relative inline-flex">
                <button
                  className="rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all"
                  type="button"
                  onClick={() => setOpenCart(!openCart)}
                >
                  <ShoppingCart />
                </button>
                {cart?.length > 0 && (
                  <span className="absolute top-1.5 right-2.5 grid min-h-[20px] min-w-[20px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 text-xs text-white">
                    {cart?.length}
                  </span>
                )}
              </div>
              {openCart && (
                <Cart setOpenCart={setOpenCart} openCart={openCart} />
              )}
            </div>
            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
              onClick={toggleList}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
