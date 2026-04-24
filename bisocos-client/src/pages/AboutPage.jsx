import Button from "../components/Button";
import aboutHero from "../assets/styles/j4 black.jpg";
import grid1 from "../assets/styles/j4 dirty white.jpg";
import grid2 from "../assets/styles/j4 white.jpg";
import grid3 from "../assets/styles/j4 white red.jpg";
import grid4 from "../assets/styles/sb dunk 5.jpg";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
              <img
                src={aboutHero}
                alt="Sneaker Hub showcase wall"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
              About Sneaker Hub
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A community-driven destination for authentic sneakers and street culture.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              At Sneaker Hub, we connect collectors with verified heat. Every pair is authenticated,
              every drop is curated, and every customer joins a culture that lives and breathes sneakers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
            Store overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            What makes Sneaker Hub unforgettable
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">05</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Years in the game
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">100%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Authentic guarantee
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">10k+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Happy collectors
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Flagship locations
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
              Behind the scenes
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              A story of passion, authenticity, and community
            </h2>
            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Verified sourcing
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  We partner with trusted suppliers and use multi-point authentication to ensure every pair is 100% legit.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Culture-first curation
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Our buyers live the culture. We handpick drops that matter, from OG retros to underground grails.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Community driven
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Sneaker Hub is built by collectors, for collectors. Trade stories, share fits, and grow with us.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
              Visual heat
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img
                  src={grid1}
                  alt="Jordan 4 collection"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img
                  src={grid2}
                  alt="Clean white sneakers"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img
                  src={grid3}
                  alt="Fire red colorway"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img
                  src={grid4}
                  alt="Premium SB Dunk showcase"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <Button className="mt-5" variant="primary">
              View Our Collection
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

