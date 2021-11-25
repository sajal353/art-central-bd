import Artworks from "../components/Home/Artworks";
import Hero from "../components/Home/Hero";
import Reviews from "../components/Home/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <Artworks />
      <section className="bg-primary text-secondary py-16 px-8 flex flex-col justify-center items-center">
        <h2 className="font-bold text-center text-3xl mb-8">
          Subscribe to receive offers and exclusive items!
        </h2>
        <form className="w-full max-w-screen-sm flex items-center">
          <input
            className="w-full bg-transparent text-secondary border border-opacity-50 border-secondary rounded-md p-4"
            type="email"
            placeholder="Email Address"
          />
          <input
            className="bg-secondary text-primary font-bold border border-secondary p-4 rounded-md ml-4"
            type="submit"
            value="Subscribe"
          />
        </form>
      </section>
      <Reviews />
    </main>
  );
}
