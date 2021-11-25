import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase/fire";
import useAuth from "./hooks/useAuth";
//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
//Components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Payments from "./components/Dashboard/Payments";
import MyOrders from "./components/Dashboard/MyOrders";
import Review from "./components/Dashboard/Review";
import AllOrders from "./components/Dashboard/AllOrders";
import AddArtwork from "./components/Dashboard/AddArtwork";
import MakeAdmin from "./components/Dashboard/MakeAdmin";
import ManageArtworks from "./components/Dashboard/ManageArtworks";
import Explore from "./pages/Explore";
import Purchase from "./pages/Purchase";

//Contexts
export const authContext = createContext();
export const loadContext = createContext();

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async (email) => {
      try {
        const res = await fetch(
          `https://art-central-bd.herokuapp.com/users/${email}`
        );
        const data = await res.json();
        setUserData(data.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await getUser(user.email);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <loadContext.Provider value={loading}>
        <authContext.Provider value={userData}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard/payment" element={<Payments />} />
              <Route path="/dashboard/orders" element={<MyOrders />} />
              <Route path="/dashboard/review" element={<Review />} />
              <Route path="/dashboard/all-orders" element={<AllOrders />} />
              <Route path="/dashboard/add-artwork" element={<AddArtwork />} />
              <Route path="/dashboard/make-admin" element={<MakeAdmin />} />
              <Route
                path="/dashboard/manage-artworks"
                element={<ManageArtworks />}
              />
            </Route>
            <Route
              path="/purchase/:id"
              element={
                <PrivateRoute>
                  <Purchase />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </authContext.Provider>
      </loadContext.Provider>
    </div>
  );
}

const PrivateRoute = ({ children }) => {
  let user = useAuth();
  let location = useLocation();
  let isLoading = useContext(loadContext);
  if (isLoading) {
    return (
      <div className="min-h-screen text-primary grid place-items-center">
        <h3>Authenticating... Please wait...</h3>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};
