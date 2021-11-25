import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";
import { v4 as uuid } from "uuid";
//Components
import Card from "../Card";

export default function Artworks() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch("https://art-central-bd.herokuapp.com/artworks")
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.data);
      });
  }, []);

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold">Featured Artworks</h2>
      <Link to="/explore" className="mt-2 inline-block">
        <span className="text-sm underline font-medium">Explore More</span>
        <BiChevronRight className="inline-block text-sm" />
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        {apiData &&
          apiData.slice(0, 5).map((art) => {
            return (
              <Card
                key={uuid()}
                image={art.image}
                title={art.name}
                price={art.price}
                id={art._id}
              />
            );
          })}
      </div>
    </section>
  );
}
