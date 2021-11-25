import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { emailSignUp } from "../firebase/fire";

export default function SignUp() {
  let navigate = useNavigate();
  let user = useAuth();

  const [err, setErr] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async (name, email) => {
    try {
      const res = await fetch(`https://art-central-bd.herokuapp.com/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user && navigate("/", { replace: true });
    window.scrollTo(0, 0);
  }, [user, navigate]);

  const formStyles = `transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 focus:bg-primary focus:text-secondary focus:outline-none`;

  return (
    <main>
      <section className="px-8 py-32 min-h-screen text-primary">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="text-2xl font-semibold">Sign up</h2>
          <div className="mt-4">
            <form className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold block flex-1">
                  Name
                  <input
                    className={formStyles}
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="font-semibold block flex-1">
                  Email
                  <input
                    className={formStyles}
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="font-semibold block flex-1">
                  Password
                  <input
                    className={formStyles}
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <button
                className="flex justify-center items-center gap-4 transition-all duration-300 w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary focus:outline-none"
                onClick={async (e) => {
                  e.preventDefault();
                  setErr("Please Wait...");
                  await addUser(name, email);
                  let msg = await emailSignUp(name, email, password);
                  setErr(msg);
                }}
              >
                {err}
              </button>
            </form>
            <Link
              to="/login"
              className="block text-center mt-4 hover:underline"
            >
              Already have an account? Log In!
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
