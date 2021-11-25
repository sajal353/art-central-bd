import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { v4 as uuid } from "uuid";

export default function Review({ title, stars, description, user }) {
  let starArr = [];
  for (let i = 0; i < stars; i++) {
    starArr.push(1);
  }
  for (let i = 0; i < 5 - stars; i++) {
    starArr.push(0);
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-2xl p-4 border border-gray-300">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="mb-2">Review By: {user}</p>
      <div className="flex items-center">
        {starArr.map((s) =>
          s === 1 ? (
            <AiFillStar key={uuid()} size={24} />
          ) : (
            <AiOutlineStar key={uuid()} size={24} />
          )
        )}
      </div>
      <p className="mt-4">{description}</p>
    </div>
  );
}
