import React, { useEffect } from "react";

const ProductBids = ({ product, bids, setBids }) => {
  const productId = product._id;
  console.log(productId);

  useEffect(() => {
    fetch(`http://localhost:5000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Bids for this product", data);
        // Sort bids descending by bid_price
        const sortedBids = data.sort(
          (a, b) => Number(b.bid_price) - Number(a.bid_price)
        );
        setBids(sortedBids);
      });
  }, [productId]);

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4">
        Bids for this Product:{" "}
        <span className="text-indigo-700 font-bold">{bids.length}</span>
      </h3>

      {/* If no bids */}
      {bids.length === 0 ? (
        <p className="text-gray-500 text-sm italic">
          No one has placed a bid yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="table">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th>#</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Offer (৳)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={bid._id || index} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              bid.buyer_image ||
                              "https://img.daisyui.com/images/profile/demo/2@94.webp"
                            }
                            alt={bid.buyer_name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-600">{bid.buyer_email}</td>
                  <td className="text-green-600 font-medium">
                    ৳{bid.bid_price}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        bid.status === "approved"
                          ? "badge-success"
                          : bid.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      } badge-sm`}
                    >
                      {bid.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductBids;
