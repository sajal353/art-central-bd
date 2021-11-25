import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function AddArtwork() {
  let user = useAuth();
  let navigate = useNavigate();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    fetch("https://art-central-bd.herokuapp.com/artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        title,
        description,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          alert("Artwork added successfully");
          navigate(0, { replace: true });
        } else {
          alert("Error adding artwork");
        }
      });
  };

  const formStyles = `transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 focus:bg-primary focus:text-secondary focus:outline-none`;

  return (
    <div>
      <h2 className="text-lg font-bold leading-none mb-6">Add New Artwork</h2>
      <hr />
      <div className="mt-4">
        {user.isAdmin ? (
          <form className="w-full grid grid-cols-1 gap-4">
            <label className="font-semibold block w-full">
              Image URL
              <input
                className={formStyles}
                type="text"
                placeholder="E.g https://unsplash.com/.../.../"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <label className="font-semibold block w-full">
              Title
              <input
                className={formStyles}
                type="text"
                placeholder="Artwork Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="font-semibold block w-full">
              Price
              <input
                className={formStyles}
                type="number"
                placeholder="Artwork Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="font-semibold block w-full">
              Description
              <input
                className={formStyles}
                type="text"
                placeholder="Artwork Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <button
              className="transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary focus:outline-none"
              onClick={async (e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Add Artwork
            </button>
          </form>
        ) : (
          <p>You are not authorized to add artwork.</p>
        )}
      </div>
    </div>
  );
}
