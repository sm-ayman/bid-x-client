import React, { use, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const ProductDetails = () => {
  const product = useLoaderData();
  const navigate = useNavigate();
  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);

  const {
    image,
    title,
    description,
    price_min,
    price_max,
    seller_name,
    seller_image,
    seller_contact,
    location,
    category,
    condition,
    usage,
    status,
    created_at,
    _id,
  } = product;

  const handleModalOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;

    console.log("Bid submitted:", _id, name, email, bid);

    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "After placing a bid");
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition"
      >
        ← Back To Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center h-96">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            {category}
          </span>

          <p className="text-2xl font-semibold text-green-600 mb-2">
            ৳{price_min} - ৳{price_max}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Price range based on product condition
          </p>

          {/* Product Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h2 className="font-semibold text-gray-800 mb-2">
              Product Details
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Product ID:</strong> {_id}
              </p>
              <p>
                <strong>Posted:</strong>{" "}
                {new Date(created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Condition:</strong> {condition}
              </p>
              <p>
                <strong>Usage:</strong> {usage}
              </p>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold text-gray-800 mb-2">
              Seller Information
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={seller_image}
                alt={seller_name}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-medium text-gray-800">{seller_name}</p>
                <p className="text-sm text-gray-500">{location}</p>
                <p className="text-sm text-gray-500">
                  {seller_contact || "No contact info"}
                </p>
                <p
                  className={`text-xs font-medium mt-1 ${
                    status === "sold"
                      ? "text-red-600"
                      : status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {status === "sold"
                    ? "Sold"
                    : status === "pending"
                    ? "On Sale"
                    : "Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            // onClick={() => document.getElementById("my_modal_5").showModal()}
            onClick={handleModalOpen}
            className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
          >
            I Want Buy This Product
          </button>
          <dialog
            ref={bidModalRef}
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-xl text-gray-800 mb-2">
                Give the Best Offer!
              </h3>
              <p className="text-gray-500 mb-5">
                Offer something the seller cannot resist 😎
              </p>

              {/* Bid Form*/}
              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buyer Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    readOnly
                    required
                    defaultValue={user.displayName}
                    className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buyer Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    required
                    defaultValue={user.email}
                    className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Offered Price (৳)
                  </label>
                  <input
                    type="number"
                    name="bid"
                    min="0"
                    required
                    placeholder="Enter your offer"
                    className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="modal-action mt-6">
                  <button
                    type="submit"
                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Submit Bid
                  </button>
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Product Description
        </h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
