import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Review() {
  let user = useAuth();
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);

  const [status, setStatus] = useState("Add Review");

  const handleSubmit = () => {
    setStatus("Submitting...");
    fetch("https://art-central-bd.herokuapp.com/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        stars,
        user: user.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          alert("Review added successfully");
          setStatus("Review Added");
          navigate(0, { replace: true });
        } else {
          alert("Error adding review");
          setStatus("Add Review");
        }
      });
  };
  const formStyles = `transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 focus:bg-primary focus:text-secondary focus:outline-none`;

  return (
    <div>
      <h2 className="text-lg font-bold leading-none mb-6">Add Review</h2>
      <hr />
      <div className="mt-4">
        {!user.isAdmin ? (
          <form className="w-full grid grid-cols-1 gap-4">
            <label className="font-semibold block w-full">
              Review Title
              <input
                className={formStyles}
                type="text"
                placeholder="E.g Awesome Service!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="font-semibold block w-full">
              Description
              <input
                className={formStyles}
                type="text"
                placeholder="Your Review"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="font-semibold block w-full">
              Rating Stars
              <input
                className={formStyles}
                type="number"
                placeholder="Rating"
                value={stars}
                max="5"
                min="0"
                step="1"
                onChange={(e) => setStars(e.target.value)}
              />
            </label>
            <button
              className="transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary focus:outline-none"
              onClick={async (e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {status}
            </button>
          </form>
        ) : (
          <p>Non-admin account required to view this area.</p>
        )}
      </div>
    </div>
  );
}
