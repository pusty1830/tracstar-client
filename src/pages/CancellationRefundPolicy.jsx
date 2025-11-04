// CancellationRefundPolicy.jsx
import React from "react";

const CancellationRefundPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Cancellation & Refund Policy
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated on Oct 24, 2025
        </p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <p>
              <strong>TRACSTARS INFORMATICS PRIVATE LIMITED</strong> believes in
              helping its customers as far as possible and has therefore adopted
              a liberal cancellation policy. Under this policy:
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900">Order Cancellation</h2>
            <p>
              Cancellations will be considered only if the request is made
              within <strong>Not Applicable</strong> of placing the order.
              However, the cancellation request may not be entertained if the
              orders have been communicated to the vendors/merchants and they
              have initiated the shipping process.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900">Perishable Items</h2>
            <p>
              TRACSTARS INFORMATICS PRIVATE LIMITED does not accept cancellation
              requests for perishable items like flowers, eatables, etc.
              However, refund or replacement can be made if the customer
              establishes that the quality of the product delivered is not good.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900">
              Damaged or Defective Items
            </h2>
            <p>
              In case of receipt of damaged or defective items, please report
              the same to our Customer Service team. The request will be
              entertained once the merchant has checked and determined the issue
              at their own end. This should be reported within{" "}
              <strong>Not Applicable</strong> of receipt of the products.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900">
              Product Not as Expected
            </h2>
            <p>
              In case you feel that the product received is not as shown on the
              site or not as per your expectations, you must bring it to the
              notice of our customer service within{" "}
              <strong>Not Applicable</strong> of receiving the product. The
              Customer Service Team, after reviewing your complaint, will take
              an appropriate decision.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900">
              Manufacturer Warranty
            </h2>
            <p>
              In case of complaints regarding products that come with a warranty
              from manufacturers, please refer the issue to them directly.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900">Refund Processing</h2>
            <p>
              In case of any refunds approved by{" "}
              <strong>TRACSTARS INFORMATICS PRIVATE LIMITED</strong>, it will
              take <strong>Not Applicable</strong> for the refund to be
              processed to the end customer.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900">Contact Us</h2>
            <p>For refund or cancellation-related queries, please contact:</p>
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
          </section>

          <hr className="my-4" />

          <p className="text-xs text-gray-500">
            Note: This policy is subject to change at any time without prior
            notice. Please review this page periodically for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
