import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Card from "../components/Card";

export default function Explore() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("https://art-central-bd.herokuapp.com/artworks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApiData(data.data);
      });
  }, []);

  return (
    <main>
      <section className="p-8">
        <h2 className="text-2xl font-bold">All Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          {apiData &&
            apiData.map((art) => {
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
    </main>
  );
}
