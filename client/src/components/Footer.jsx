import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary border-t-4 border-secondary">
      <div className="p-8">
        <h3 className="text-2xl font-semibold">Art Central</h3>
        <p className="mt-4 mb-2">Our Socials</p>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/sajal.biswas.353/"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/wtfimdoingoninstaowo/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram size={24} />
          </a>
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <Link to="/explore">Explore</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/">Terms {"&"} Conditions</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">About Us</Link>
        </div>
      </div>
      <p className="bg-secondary text-primary text-sm p-2 text-center">
        &copy; 2021 Art Central - All Rights Reserved by Frost
      </p>
    </footer>
  );
}
