import { Link, useLocation, useNavigate } from "react-router-dom";
import { emailSignIn } from "../firebase/fire";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let user = useAuth();

  const [err, setErr] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    user &&
      navigate(
        location.state?.from?.pathname ? location.state?.from?.pathname : "/",
        { replace: true }
      );

    window.scrollTo(0, 0);
  }, [user, navigate, location]);

  const formStyles = `transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 focus:bg-primary focus:text-secondary focus:outline-none`;

  return (
    <main>
      <section className="px-8 py-32 min-h-screen text-primary">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="text-2xl font-semibold">Log In</h2>
          <div className="mt-4">
            <form className="mt-4 grid grid-cols-1 gap-4">
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
                className="transition-all duration-300 block w-full px-4 py-3 bg-transparent border-2 border-primary font-semibold placeholder-primary placeholder-opacity-70 hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary focus:outline-none"
                onClick={async (e) => {
                  e.preventDefault();
                  setErr("Please Wait...");
                  let msg = await emailSignIn(email, password);
                  setErr(msg);
                }}
              >
                {err}
              </button>
            </form>
            <Link
              to="/signup"
              className="block text-center mt-4 hover:underline"
            >
              Don't have an account? Sign Up!
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
