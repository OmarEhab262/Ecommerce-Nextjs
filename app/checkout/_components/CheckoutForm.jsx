import { useContext, useState, useRef } from "react";
import CartContext from "../../_context/CartContext";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useUser } from "@clerk/nextjs";
import OrderApis from "../../_utils/OrderApis";
import CartApis from "../../_utils/CartApis";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cart, setCart] = useContext(CartContext);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const submitBtnRef = useRef(null);

  const handleError = (error) => {
    setErrorMessage(error.message);
    if (submitBtnRef.current) {
      submitBtnRef.current.disabled = false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitBtnRef.current.disabled) {
      return;
    }

    submitBtnRef.current.disabled = true;
    setLoading(true);

    try {
      if (
        cart.length === 0 ||
        !user ||
        !user.primaryEmailAddress?.emailAddress ||
        !user.fullName
      ) {
        throw new Error("Cart is empty or user data is incomplete");
      }

      const orderCreated = await createOrder();
      if (!orderCreated) {
        throw new Error("Failed to create order.");
      }

      await sendEmail();

      const { error: submitError } = await elements.submit();

      if (submitError) {
        handleError(submitError);
        return;
      }

      const amountInCents = Math.round(amount * 100);
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountInCents }),
      });

      if (!res.ok) {
        throw new Error("Failed to create payment intent");
      }

      const clientSecret = await res.json();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:3000/payment-confirmation",
        },
      });

      if (error) {
        handleError(error);
      } else {
        console.log("Payment successful!");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      if (submitBtnRef.current) {
        submitBtnRef.current.disabled = false;
      }
    }
  };

  const createOrder = async () => {
    const productIds = cart.map((item) => item?.product?.id);
    const data = {
      data: {
        email: user?.primaryEmailAddress?.emailAddress,
        username: user?.fullName,
        amount,
        products: productIds,
      },
    };

    try {
      const res = await OrderApis.createOrder(data);
      if (res) {
        await Promise.all(
          cart.map((item) => CartApis.deleteCartItem(item?.id))
        );
        console.log("Cart items deleted successfully");
      }
      return true;
    } catch (error) {
      console.error("Error creating order:", error);
      return false;
    }
  };

  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[220px] mt-12">
        <PaymentElement />
        {errorMessage && (
          <p className="text-red-500 mt-2" id="error-message">
            {errorMessage}
          </p>
        )}
        <button
          id="submit"
          className="bg-primary p-2 rounded-md w-full flex justify-center items-center text-center mt-5"
          type="submit"
          disabled={!stripe || loading}
          ref={submitBtnRef}
        >
          {loading ? <div role="status">Loading...</div> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
