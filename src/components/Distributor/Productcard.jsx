export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">₹{product.price}/kg</p>
      <p className="text-sm">Min Qty: {product.minQty} kg</p>
      <p className="text-sm text-green-600">AI Grade: {product.aiGrade}</p>

      <button className="mt-3 w-full bg-green-600 text-white py-1 rounded">
        Buy Bulk
      </button>
    </div>
  );
}
