import React, { use } from "react";

const LatestProducts = ({ latestProductsPromise }) => {
  // - get-products-data
  const products = use(latestProductsPromise);

  console.log(products);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12">
      {/* - title */}
      <h3 className="text-3xl font-bold text-center mb-10 text-indigo-600">
        Latest Products
      </h3>

      {/* - products-grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          // - single-card
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border border-gray-100"
          >
            {/* - image */}
            <div className="h-48 w-full rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* - title */}
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {product.title}
            </h4>

            {/* - price-range */}
            <p className="text-sm text-indigo-600 font-semibold mb-1">
              ৳ {product.price_min} - ৳ {product.price_max}
            </p>

            {/* - location */}
            <p className="text-xs text-gray-500 mb-3">📍 {product.location}</p>

            {/* - seller-info */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src={product.seller_image}
                alt="Seller"
                className="w-8 h-8 rounded-full border border-gray-200"
              />
              <p className="text-sm text-gray-600">{product.seller_name}</p>
            </div>

            {/* - buttons */}
            <div className="flex justify-between items-center">
              <button className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 transition">
                View Details
              </button>
              <span className="text-xs text-gray-500">{product.condition}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;
