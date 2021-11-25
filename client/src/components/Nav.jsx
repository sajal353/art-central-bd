import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { signOutUser } from "../firebase/fire";

export default function Nav() {
  let user = useAuth();

  return (
    <nav className="px-8 py-6 flex justify-between items-center">
      <div className="font-bold">
        <Link
          className="text-xl font-bold leading-none border-b-2 border-transparent hover:border-primary focus:border-primary"
          to="/"
        >
          Art Central
        </Link>
      </div>
      <div className="flex items-center space-x-6 font-medium">
        <Link
          className="hidden md:block font-medium border-b-2 border-transparent hover:border-primary focus:border-primary"
          to="/explore"
        >
          Explore
        </Link>
        {user ? (
          <>
            <p className="hidden md:block font-medium border-b-2 border-transparent">
              Hello, {user.name ? user.name : user.email}{" "}
              {user.isAdmin ? "(Admin)" : ""}
            </p>
            <Link
              className="font-medium border-b-2 border-transparent hover:border-primary focus:border-primary"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <button
              className="font-medium border-b-2 border-transparent hover:border-primary focus:border-primary"
              onClick={signOutUser}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              className="font-medium border-b-2 border-transparent hover:border-primary focus:border-primary"
              to="/login"
            >
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
