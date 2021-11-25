import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Purchase() {
  let user = useAuth();
  let { id } = useParams();
  let navigate = useNavigate();

  const submitRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [apiData, setApiData] = useState(null);

  const [artwork, setArtwork] = useState(null);

  const [status, setStatus] = useState("Purchase");

  const handleSubmit = async () => {
    setStatus("Processing...");
    const res = await fetch(`https://art-central-bd.herokuapp.com/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        artwork,
        name,
        email,
        phone,
        address,
      }),
    });
    const data = await res.json();
    if (data.message === "Success") {
      alert("Purchase Successful");
      setStatus("Complete");
      navigate("/dashboard/orders");
    } else {
      alert("Purchase Failed. Please Try again.");
      setStatus("Purchase");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setName(user.name);
    setEmail(user.email);

    fetch(`https://art-central-bd.herokuapp.com/artworks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.data[0]);
        setArtwork({
          id: data.data[0]._id,
          name: data.data[0].name,
          price: data.data[0].price,
          image: data.data[0].image,
        });
      });
  }, [user, id]);

  const formStyles = `transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 focus:bg-primary focus:text-secondary focus:outline-none`;

  return (
    <main>
      <section className="p-8">
        <h1 className="font-bold text-2xl">Purchase Artwork</h1>
        <div className="flex flex-col md:flex-row justify-between mt-8 space-y-8 md:space-y-0 md:space-x-8">
          {apiData && (
            <div className="flex-1">
              <h2 className="font-bold text-xl">Artwork: {apiData.name}</h2>
              <p className="font-bold text-xl mt-4">Price: ${apiData.price}</p>
              <p className="mt-4 mb-8">{apiData.description}</p>
              <img
                className="w-full rounded-lg"
                src={apiData.image}
                alt={apiData.name}
              />
            </div>
          )}
          <div className="flex-1">
            <form
              className="w-full grid grid-cols-1 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label className="font-semibold block w-full">
                Name
                <input
                  className={formStyles}
                  type="text"
                  placeholder="Your Full Name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="font-semibold block w-full">
                Email
                <input
                  className={formStyles}
                  type="email"
                  placeholder="Your Email Address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="font-semibold block w-full">
                Phone
                <input
                  className={formStyles}
                  type="number"
                  placeholder="Phone Number"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
              <label className="font-semibold block w-full">
                Address
                <input
                  className={formStyles}
                  type="text"
                  placeholder="Full Address"
                  autoComplete="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
              <button
                ref={submitRef}
                className="transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary focus:outline-none"
              >
                {status}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
