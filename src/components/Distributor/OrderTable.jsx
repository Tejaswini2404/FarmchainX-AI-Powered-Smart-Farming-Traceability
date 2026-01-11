export default function OrderTable({ orders }) {
  return (
    <table className="w-full bg-white rounded shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Order ID</th>
          <th>Crop</th>
          <th>Qty</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(o => (
          <tr key={o.id} className="text-center border-t">
            <td className="p-2">#{o.id}</td>
            <td>{o.crop}</td>
            <td>{o.qty}kg</td>
            <td className="font-semibold">{o.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
