import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "../../State/Admin/Customers/Action";

const CustomerTable = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector(
    (store) => store.adminCustomer
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(id));
    }
  };

  const toggleBlockStatus = (customer) => {
    const updatedStatus = customer.status === "Active" ? "Blocked" : "Active";
    const confirmMessage = `Are you sure you want to ${
      updatedStatus === "Blocked" ? "block" : "unblock"
    } this customer?`;

    if (window.confirm(confirmMessage)) {
      dispatch(updateCustomer(customer._id, { status: updatedStatus }));
    }
  };

  return (
    <div
      className="p-5"
      style={{
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        color: "#ffffff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 className="text-2xl font-bold mb-4">Customers Table</h2>
      {loading && <p>Loading customers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Summary Section */}
      <div className="summary-section mb-4">
        <p>Total Customers: {customers.length}</p>
        <p>
          Active Customers:{" "}
          {customers.filter((c) => c.status === "Active").length}
        </p>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-600">
          <thead>
            <tr className="bg-indigo-900">
              <th className="py-2 px-4 border border-gray-600 text-left">ID</th>
              <th className="py-2 px-4 border border-gray-600 text-left">
                Name
              </th>
              <th className="py-2 px-4 border border-gray-600 text-left">
                Email
              </th>
              <th className="py-2 px-4 border border-gray-600 text-left">
                Total Orders
              </th>
              <th className="py-2 px-4 border border-gray-600 text-left">
                Status
              </th>
              <th className="py-2 px-4 border border-gray-600 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} className="bg-indigo-950">
                <td className="py-2 px-4 border border-gray-600">
                  {customer._id}
                </td>
                <td className="py-2 px-4 border">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="py-2 px-4 border border-gray-600">
                  {customer.email}
                </td>
                <td className="py-2 px-4 border border-gray-600">
                  {customer.totalOrders}
                </td>
                <td className="py-2 px-4 border border-gray-600">
                  {customer.status}
                </td>
                <td className="py-2 px-4 border border-gray-600">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleBlockStatus(customer)}
                      className={`px-3 py-1 rounded ${
                        customer.status === "Active"
                          ? "bg-yellow-800 hover:bg-yellow-600 text-white"
                          : "bg-yellow-600 hover:bg-yellow-700 text-white"
                      } transition-colors`}
                    >
                      {customer.status === "Active" ? "Block" : "Unblock"}
                    </button>

                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="bg-pink-950 hover:bg-pink-900 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
