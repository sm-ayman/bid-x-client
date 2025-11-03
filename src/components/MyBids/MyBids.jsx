import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const sortedBids = data.sort(
            (a, b) => Number(b.bid_price) - Number(a.bid_price)
          );
          setBids(sortedBids);
          console.log(sortedBids);
        });
    }
  }, [user?.email]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bids</h1>

      {bids.length === 0 ? (
        <p className="text-gray-500 italic">You haven't placed any bids yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Product ID</th>
                <th className="px-4 py-2 text-left">Buyer</th>
                <th className="px-4 py-2 text-left">Offer (৳)</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bids.map((bid, index) => (
                <tr key={bid._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-medium">{bid.product}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={bid.buyer_image}
                      alt={bid.buyer_name}
                      className="h-8 w-8 rounded-full object-cover border"
                    />
                    <span>{bid.buyer_name}</span>
                  </td>
                  <td className="px-4 py-2 text-green-600 font-semibold">
                    ৳{bid.bid_price}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        bid.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : bid.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
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

export default MyBids;
