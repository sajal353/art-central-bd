import { Link } from "react-router-dom";

export default function Card({ image, title, price, id }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl">
      <img
        className="object-cover w-full h-64 rounded-lg"
        src={image}
        alt={title}
      />
      <div className="py-4 px-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="font-bold text-lg">${price}</p>
        </div>
        <Link
          to={`/purchase/${id}`}
          className="transition-all duration-300 block mt-4 px-4 py-2 border border-gray-300 rounded-md font-medium text-center hover:bg-primary hover:text-secondary"
        >
          Purchase
        </Link>
      </div>
    </div>
  );
}
