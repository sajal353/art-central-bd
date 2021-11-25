import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useAuth from "../../hooks/useAuth";

export default function AllOrders() {
  let user = useAuth();
  let navigate = useNavigate();

  const [apiData, setApiData] = useState(null);

  const cancelOrder = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://art-central-bd.herokuapp.com/orders`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Success") {
            alert("Order Deleted");
            navigate(0, { replace: true });
          } else {
            alert("Deletion Failed. Please Try again.");
          }
        });
    }
  };

  const shipOrder = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://art-central-bd.herokuapp.com/orders`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: "Shipped",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Success") {
            alert("Order Shipped!");
            navigate(0, { replace: true });
          } else {
            alert("Shipping Failed. Please Try again.");
          }
        });
    }
  };

  useEffect(() => {
    fetch(`https://art-central-bd.herokuapp.com/orders`)
      .then((res) => res.json())
      .then((data) => setApiData(data.data));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold leading-none mb-6">Manage All Orders</h2>
      <hr />
      <div className="mt-4 grid grid-cols-1 gap-4 overflow-y-scroll">
        <div className="flex min-w-screen-md justify-between items-center font-medium">
          <p>Preview</p>
          <p>Name</p>
          <p>Price</p>
          <p>User</p>
          <p>Phone</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        {user.isAdmin ? (
          <>
            {apiData &&
              apiData.map((order) => {
                return (
                  <div
                    className="min-w-screen-md flex justify-between items-center"
                    key={uuid()}
                  >
                    <img
                      className="w-16 h-16 rounded-full object-cover"
                      src={order.artwork.image}
                      alt={order.artwork.name}
                    />
                    <p>{order.artwork.name}</p>
                    <p>${order.artwork.price}</p>
                    <p>{order.name}</p>
                    <p>{order.phone}</p>
                    <p>{order.status}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {order.status === "Pending" && (
                        <button
                          onClick={() => shipOrder(order._id)}
                          className="p-2 border border-primary rounded-md"
                        >
                          Ship
                        </button>
                      )}
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="p-2 border border-primary rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <p>You are not authorized to view all orders.</p>
        )}
      </div>
    </div>
  );
}
