import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useAuth from "../../hooks/useAuth";

export default function ManageArtworks() {
  let user = useAuth();
  let navigate = useNavigate();

  const [apiData, setApiData] = useState(null);

  const deleteArtwork = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://art-central-bd.herokuapp.com/artworks`, {
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
          console.log(data);
          if (data.message === "Success") {
            alert("Artwork Deleted");
            navigate(0, { replace: true });
          } else {
            alert("Deletion Failed. Please Try again.");
          }
        });
    }
  };

  useEffect(() => {
    fetch(`https://art-central-bd.herokuapp.com/artworks`)
      .then((res) => res.json())
      .then((data) => setApiData(data.data));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold leading-none mb-6">
        Manage All Artworks
      </h2>
      <hr />
      <div className="mt-4 grid grid-cols-1 gap-4 overflow-y-scroll">
        <div className="min-w-screen-md flex justify-between items-center font-medium">
          <p>Preview</p>
          <p>Name</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {user.isAdmin ? (
          <>
            {apiData &&
              apiData.map((art) => {
                return (
                  <div
                    className="min-w-screen-md flex justify-between items-center"
                    key={uuid()}
                  >
                    <img
                      className="w-16 h-16 rounded-full object-cover"
                      src={art.image}
                      alt={art.name}
                    />
                    <p>{art.name}</p>
                    <p>${art.price}</p>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => deleteArtwork(art._id)}
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
          <p>You are not authorized manage artworks.</p>
        )}
      </div>
    </div>
  );
}
