import Button from "../components/Button";
import heroImg from "../assets/styles/sb dunk 6.jpg";
import card1Img from "../assets/styles/sb dunk 7.jpeg";
import card2Img from "../assets/styles/sb dunk 8.jpg";
import card3Img from "../assets/styles/sb dunk 9.webp";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
              Premium Collection
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Sneaker Hub brings heat, culture, and iconic kicks to every step.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              From limited Jordan drops to rare SB Dunks and timeless classics,
              every pair is authenticated, curated, and delivered with passion.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Discover Sneaker Hub
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-[260px] items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
              <img
                src={heroImg}
                alt="Premium sneakers from Sneaker Hub"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
            Collection highlights
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            The numbers behind our hustle
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">500+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Authentic pairs
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">50+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Rare drops
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Top brands
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">24h</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Fast shipping
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
            Featured drops
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Our latest heat
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="overflow-hidden rounded-[1.25rem]">
              <img
                src={card1Img}
                alt="Rare SB Dunk collection"
                className="h-48 w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              SB Dunk exclusives
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              From streetwear collabs to grail-level colorways, the most sought-after Dunks live here.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="overflow-hidden rounded-[1.25rem]">
              <img
                src={card2Img}
                alt="Jordan retro collection"
                className="h-48 w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Jordan retro classics
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Iconic silhouettes, OG colorways, and modern remixes for true heads and new collectors alike.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="overflow-hidden rounded-[1.25rem]">
              <img
                src={card3Img}
                alt="Limited streetwear drops"
                className="h-48 w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Limited streetwear
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Apparel and accessories that complete the fit. Drops you cannot find anywhere else.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

