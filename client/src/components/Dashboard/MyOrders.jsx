import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useAuth from "../../hooks/useAuth";

export default function MyOrders() {
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
            alert("Order Cancelled");
            navigate(0, { replace: true });
          } else {
            alert("Cancellation Failed. Please Try again.");
          }
        });
    }
  };

  useEffect(() => {
    fetch(`https://art-central-bd.herokuapp.com/orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => setApiData(data.data));
  }, [user.email]);

  return (
    <div>
      <h2 className="text-lg font-bold leading-none mb-6">My Orders</h2>
      <hr />

      <div className="mt-4 grid grid-cols-1 gap-4 overflow-y-scroll">
        <div className="min-w-screen-md flex justify-between items-center font-medium">
          <p>Preview</p>
          <p>Name</p>
          <p>Price</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        {!user.isAdmin ? (
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
                    <p>{order.status}</p>
                    {order.status === "Pending" ? (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="p-2 border border-primary rounded-md"
                      >
                        Cancel
                      </button>
                    ) : (
                      <p>Already Shipped</p>
                    )}
                  </div>
                );
              })}
          </>
        ) : (
          <p>Non-admin account required to view this area.</p>
        )}
      </div>
    </div>
  );
}
