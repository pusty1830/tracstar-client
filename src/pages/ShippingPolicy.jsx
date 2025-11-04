// ShippingPolicy.jsx
import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Shipping & Delivery Policy
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated on Oct 24, 2025
        </p>

        <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
          <p>
            For <strong>international buyers</strong>, orders are shipped and
            delivered through registered international courier companies and/or
            International Speed Post only.
          </p>

          <p>
            For <strong>domestic buyers</strong>, orders are shipped through
            registered domestic courier companies and/or Speed Post only.
          </p>

          <p>
            Orders are shipped within <strong>Not Applicable</strong> or as per
            the delivery date agreed at the time of order confirmation. The
            delivery of the shipment is subject to the courier company or post
            office norms.
          </p>

          <p>
            <strong>Tracstars Informatics Private Limited</strong> is not liable
            for any delay in delivery by the courier company or postal
            authorities. We only guarantee to hand over the consignment to the
            courier company or postal authorities within{" "}
            <strong>Not Applicable</strong> from the date of the order and
            payment, or as per the delivery date agreed at the time of order
            confirmation.
          </p>

          <p>
            Delivery of all orders will be made to the address provided by the
            buyer at the time of placing the order.
          </p>

          <p>
            Delivery of our services will be confirmed on your registered email
            ID as specified during registration.
          </p>

          <p>
            For any issues in utilizing our services, you may contact our
            helpdesk:
          </p>

          <ul className="list-disc list-inside ml-2">
            <li>
              📞 <strong>Phone:</strong> 9853759132
            </li>
            <li>
              ✉️ <strong>Email:</strong>{" "}
              <a
                href="mailto:support@tracstarsinformatics.com"
                className="text-blue-600 hover:underline"
              >
                support@tracstarsinformatics.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
