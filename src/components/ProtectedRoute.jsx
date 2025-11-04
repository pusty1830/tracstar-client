import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../services/AuthedContext"; // adjust path if needed
import { getUserId } from "../services/axiosClient";
import { getAllPayments } from "../services/services";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isPaid, setIsPaid] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const userId = getUserId();
        if (!userId) {
          setIsPaid(false);
          setLoading(false);
          return;
        }

        const payLoad = {
          data: { filter: "", userId,isComplete:false },
          page: 0,
          pageSize: 1000,
          order: [["createdAt", "DESC"]],
        };

        const res = await getAllPayments(payLoad);

        // assume API returns res.data.data as an array of payments
        const payments = res?.data?.data?.rows || [];
        console.log(payments);

        // Find if any successful payment exists (status === "paid")
        const hasPaid = payments.some(
          (payment) =>
            payment.status?.toLowerCase() === "paid" ||
            payment.isComplete === true
        );

        setIsPaid(hasPaid);
        localStorage.setItem("isPaid", hasPaid ? "true" : "false");
      } catch (err) {
        console.error("Error fetching payments:", err);
        setIsPaid(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, []);

  // While checking payment
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-slate-600 text-lg">
        Checking payment status...
      </div>
    );
  }

  // 1️⃣ Check if user is logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Check if user has paid
  if (!isPaid) {
    return <Navigate to="/paywall" replace />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
