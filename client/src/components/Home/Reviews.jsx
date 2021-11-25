import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Review from "../Review";

export default function Reviews() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch("https://art-central-bd.herokuapp.com/reviews")
      .then((response) => response.json())
      .then((data) => setApiData(data.data));
  }, []);

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {apiData &&
          apiData.map((r) => (
            <Review
              key={uuid()}
              title={r.title}
              user={r.user}
              description={r.description}
              stars={r.stars}
            />
          ))}
      </div>
    </section>
  );
}
