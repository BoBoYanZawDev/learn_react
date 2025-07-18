import { Link } from "react-router";

function ProductCard({ product }) {
  return (
    <Link to={'/product/'+ product.id}>

    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64">
        <img
          src={product.images[0]?.url}
          alt="Fjallraven Backpack"
          className="w-full h-full object-contain p-4"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-800 bg-blue-100 font-semibold rounded px-2 py-1">
            {product.category.name}
          </span>
          {/* <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div> */}
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            $ {product.price}
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            View Detial
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ProductCard;
