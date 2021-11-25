import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useAuth from "../../hooks/useAuth";

export default function MakeAdmin() {
  let user = useAuth();
  let navigate = useNavigate();

  const [apiData, setApiData] = useState(null);

  const makeAdmin = (email) => {
    if (window.confirm("Are you sure? This step is irreversible!")) {
      fetch(`https://art-central-bd.herokuapp.com/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Success") {
            alert("Successfully made an Admin!");
            navigate(0, { replace: true });
          } else {
            alert("Action Failed. Please Try again.");
          }
        });
    }
  };

  useEffect(() => {
    fetch(`https://art-central-bd.herokuapp.com/users`)
      .then((res) => res.json())
      .then((data) => setApiData(data.data));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold leading-none mb-6">Make New Admin</h2>
      <hr />
      <div className="mt-4 grid grid-cols-1 gap-4 overflow-y-scroll">
        <div className="min-w-screen-md flex justify-between items-center font-medium">
          <p>User ID</p>
          <p>Name</p>
          <p>Email</p>
          <p>Admin Status</p>
          <p>Action</p>
        </div>
        {user.isAdmin ? (
          <>
            {apiData &&
              apiData.map((u) => {
                return (
                  <div
                    className="min-w-screen-md flex justify-between items-center"
                    key={uuid()}
                  >
                    <p>{u._id.substr(0, 12)}</p>
                    <p>{u.name}</p>
                    <p>{u.email}</p>
                    <p>{u.isAdmin ? "Yes" : "No"}</p>
                    {u.isAdmin ? (
                      <p>Already An Admin</p>
                    ) : (
                      <button
                        onClick={() => makeAdmin(u.email)}
                        className="p-2 border border-primary rounded-md"
                      >
                        Make Admin
                      </button>
                    )}
                  </div>
                );
              })}
          </>
        ) : (
          <p>You are not authorized to view this.</p>
        )}
      </div>
    </div>
  );
}
