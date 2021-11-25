import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  let location = useLocation();
  let user = useAuth();

  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
  }, []);

  return (
    <main className="px-8 py-6">
      <div>
        <h1 className="text-xl font-bold">DASHBOARD</h1>
      </div>
      <div className="mt-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <aside className="w-full md:w-1/4 border rounded-lg overflow-hidden">
          <nav className="grid grid-cols-1">
            {user.isAdmin ? (
              <>
                <Link
                  className="font-medium hover:bg-primary hover:text-secondary px-6 py-4"
                  to="/dashboard/all-orders"
                >
                  Manage All Orders
                </Link>
                <Link
                  className="font-medium hover:bg-primary hover:text-secondary px-6 py-4"
                  to="/dashboard/add-artwork"
                >
                  Add An Artwork
                </Link>
                <Link
                  className="font-medium hover:bg-primary hover:text-secondary px-6 py-4"
                  to="/dashboard/make-admin"
                >
                  Make Admin
                </Link>
                <Link
                  className="font-medium hover:bg-primary hover:text-secondary px-6 py-4"
                  to="/dashboard/manage-artworks"
                >
                  Manage Artworks
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="font-medium hover:bg-primary hover:text-secondary px-6 py-4"
                  to="/dashboard/payment"
                >
                  Payments
                </Link>
                <Link
                  className="font-medium hover:bg-primary hover:text-secondary px-6 py-4"
                  to="/dashboard/orders"
                >
                  My Orders
                </Link>
                <Link
                  className="font-medium hover:bg-primary hover:text-secondary px-6 py-4"
                  to="/dashboard/review"
                >
                  Add A Review
                </Link>
              </>
            )}
          </nav>
        </aside>
        <section className="flex-1 border rounded-lg p-6">
          {location.pathname === "/dashboard" ? (
            <div>
              <h3 className="font-bold text-2xl">
                Hello, {user.name}! I am the dashboard.
              </h3>
              <p className="mt-4">Choose an option to get started.</p>
              <p className="mt-4 font-medium text-xl">{time}</p>
            </div>
          ) : (
            <Outlet />
          )}
        </section>
      </div>
    </main>
  );
}
