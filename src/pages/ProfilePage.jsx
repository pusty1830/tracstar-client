// src/pages/ProfilePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  getMyProfile,
  updateProfile,
  getAllPayments,
} from "../services/services";
import { getUserId } from "../services/axiosClient";

const StatBadge = ({ status }) => {
  const color =
    status === "paid"
      ? "bg-green-100 text-green-700 border border-green-200"
      : status === "pending"
      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
      : "bg-gray-100 text-gray-700 border border-gray-200";
  return (
    <span className={`text-xs px-2 py-1 rounded-md ${color}`}>{status}</span>
  );
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });
  const [payments, setPayments] = useState([]);

  const userId = useMemo(() => getUserId(), []);

  useEffect(() => {
    const boot = async () => {
      const payLoad = {
        data: { filter: "", userId },
        page: 0,
        pageSize: 1000,
        order: [["createdAt", "DESC"]],
      };
      try {
        const [pRes, payRes] = await Promise.all([
          getMyProfile(), // expects current user's profile
          getAllPayments(payLoad), // expects array of payments for current user
        ]);

        const p = pRes?.data?.data || {};
        setProfile({
          userName: p.userName || "",
          email: p.email || "",
          phoneNumber: p.phoneNumber || "",
        });

        setPayments(payRes?.data?.data?.rows || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfile(profile);
      const updated = res?.data?.data;
      if (updated) {
        setProfile({
          userName: updated.userName,
          email: updated.email,
          phoneNumber: updated.phoneNumber,
        });
        toast.success("Profile updated successfully.");
      } else {
        toast.error("Update failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  const totalPaid = useMemo(() => {
    return payments
      .filter((p) => String(p.status).toLowerCase() === "paid")
      .reduce((sum, p) => sum + Number(p.money || 0), 0);
  }, [payments]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading profile…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile card */}
        <div className="bg-white rounded-2xl shadow p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="userName"
                value={profile.userName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
                placeholder="9999999999"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`w-full text-white font-medium px-4 py-2 rounded-lg shadow transition
              ${
                saving
                  ? "bg-[#001633] cursor-not-allowed"
                  : "bg-[#001F3F] hover:bg-[#002b60] cursor-pointer"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Right: Payments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Payments</h2>
              <div className="text-sm text-gray-600">
                Total Paid: <span className="font-semibold">₹{totalPaid}</span>
              </div>
            </div>

            {payments.length === 0 ? (
              <div className="text-gray-600 mt-4">No payments yet.</div>
            ) : (
              <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {payments.map((pay) => (
                  <div
                    key={pay.id}
                    className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl font-semibold">
                          ₹{Number(pay.money || 0)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(pay.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <StatBadge status={String(pay.status).toLowerCase()} />
                    </div>

                    <div className="mt-3 text-sm text-gray-700">
                      <div className="truncate">
                        <span className="text-gray-500">Payment ID: </span>
                        {pay.razorpay_payment_id || "-"}
                      </div>
                      <div className="truncate">
                        <span className="text-gray-500">Order ID: </span>
                        {pay.razorpay_order_id || "-"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* (Optional) Recent activity, etc. can go here */}
        </div>
      </div>
    </div>
  );
}
