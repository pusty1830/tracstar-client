import React from "react";
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
    const isLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      // 1. Create order on backend (expect amount in rupees)
      const res = await createOrder({ amount: 51 });
      const order = res?.data?.data;
      if (!order || !order.id) {
        console.error("Order creation failed or order missing:", res);
        alert("Unable to create payment order. Try again later.");
        return;
      }

      console.log("🔹 Backend order:", order);

      const options = {
        key: R_KEY_ID,
        amount: order.amount, // usually in paise (5100 for ₹51)
        currency: order.currency || "INR",
        order_id: order.id,
        name: "Access Fee",
        description: "Pay ₹51 to unlock this page",
        handler: async function (response) {
          console.log("🔹 Razorpay raw response:", response);

          const verifyPayload = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: order.amount, // pass paise if backend expects paise
          };

          console.log("🔹 Payload to verify:", verifyPayload);

          try {
            // Wait for backend verification
            const verifyRes = await verifyPayment(verifyPayload);
            console.log("🔹 Verify response:", verifyRes);

            // Adjust this check to whatever your backend returns
            const verified = Boolean(
              verifyRes?.data?.success || verifyRes?.status === 200
            );

            if (!verified) {
              console.error("Payment verification failed:", verifyRes?.data);
              toast.error(
                "Payment verification failed. Please contact support."
              );
              return;
            }

            // Create local payment record
            const createPaymentPayload = {
              userId: getUserId(),
              money: "51",
              status: "paid",
              razorpay_payment_id: response.razorpay_payment_id, // optional extra
            };

            const createRes = await createPayment(createPaymentPayload);
            console.log("🔹 createPayment response:", createRes);

            const paymentId = createRes?.data?.data?.id;
            if (paymentId) {
              toast.success("Your Payment Successfully Completed");
              // redirect — use navigate if you prefer react-router
              window.location.href = `/resume-builder?paymentId=${paymentId}`;
            } else {
              toast.error(
                "Payment completed but server record missing. Contact support."
              );
              console.error(
                "Missing payment ID in createPayment response:",
                createRes
              );
            }
          } catch (err) {
            console.error("Verification/createPayment error:", err);
            toast.error("Error verifying payment. Please try again.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#f97316" },
      };

      const rzp = new window.Razorpay(options);

      // Handle explicit failure/cancel
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed event:", response);
        toast.error("Payment failed or was cancelled.");
      });

      rzp.open();
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Error creating order. Try again later.");
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
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all cursor-pointer"
        >
          Pay ₹51 Now
        </button>
      </div>
    </div>
  );
};

export default Paywall;
