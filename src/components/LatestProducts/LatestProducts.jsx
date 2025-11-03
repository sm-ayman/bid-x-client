import React, { use } from "react";
import Product from "../Product/Product";

const LatestProducts = ({ latestProductsPromise }) => {
  // - get-products-data
  const products = use(latestProductsPromise);
  //   console.log(products);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12">
      {/* - title */}
      <h3 className="text-3xl font-bold text-center mb-10 text-indigo-600">
        Latest Products
      </h3>

      {/* - products-grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;
