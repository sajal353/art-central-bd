export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4 justify-between items-center p-8">
      <div className="flex-1">
        <h1 className="font-bold text-6xl">
          Discover and collect curated Artworks.
        </h1>
        <h2 className="mt-4 text-2xl">
          A marketplace by Creatives for Creatives.
        </h2>
      </div>
      <div className="relative flex-1 max-h-screen-80 rounded-lg overflow-hidden shadow-2xl">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1636814661853-f65b42a55b08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="artwork"
        />
        <div className="absolute bottom-0 left-0 bg-secondary font-medium p-4">
          <h3>
            Artwork by <span className="font-bold">Art Central</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
