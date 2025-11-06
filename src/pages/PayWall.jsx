import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { R_KEY_ID } from "../services/Secret";
import {
  createOrder,
  createPayment,
  verifyPayment,
} from "../services/services";
import { getUserId } from "../services/axiosClient";
import { toast } from "react-toastify";

const Paywall = () => {
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    setIsPaying(true);

    const isLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK");
      setIsPaying(false);
      return;
    }

    try {
      const res = await createOrder({ amount: 51 });
      const order = res?.data?.data;

      if (!order || !order.id) {
        alert("Unable to create payment order. Try again later.");
        setIsPaying(false);
        return;
      }

      const options = {
        key: R_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        order_id: order.id,
        name: "Tracstars Informatics Platform Fee",
        description: "Pay ₹51 to unlock this page",
        handler: async function (response) {
          const verifyPayload = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: order.amount,
          };

          try {
            const verifyRes = await verifyPayment(verifyPayload);
            const verified = Boolean(
              verifyRes?.data?.success || verifyRes?.status === 200
            );

            if (!verified) {
              toast.error("Payment verification failed.");
              setIsPaying(false);
              return;
            }

            const createPaymentPayload = {
              userId: getUserId(),
              money: "51",
              status: "paid",
              razorpay_payment_id: response.razorpay_payment_id,
            };

            const createRes = await createPayment(createPaymentPayload);
            const paymentId = createRes?.data?.data?.id;

            if (paymentId) {
              toast.success("Payment Successful!");
              window.location.href = `/resume-builder?paymentId=${paymentId}`;
            } else {
              toast.error("Payment recorded but ID missing. Contact support.");
              setIsPaying(false);
            }
          } catch (err) {
            toast.error("Error verifying payment.");
            setIsPaying(false);
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#001F3F" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed or cancelled.");
        setIsPaying(false);
      });

      rzp.open();
    } catch (err) {
      alert("Error creating order. Try again later.");
      setIsPaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Unlock Premium Page
        </h2>
        <p className="text-gray-600 mb-6">
          You need to pay <span className="font-semibold">₹51</span> to access
          this page.
        </p>

        <button
          onClick={displayRazorpay}
          disabled={isPaying}
          className={`w-full text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all 
            ${
              isPaying
                ? "bg-[#001633] cursor-not-allowed" // darker navy when clicked
                : "bg-[#001F3F] hover:bg-[#002b60] cursor-pointer"
            }`}
        >
          {isPaying ? "Processing..." : "Pay ₹51 Now"}
        </button>
      </div>
    </div>
  );
};

export default Paywall;
