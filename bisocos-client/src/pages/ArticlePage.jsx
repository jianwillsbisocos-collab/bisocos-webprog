import Button from '../components/Button';

const imageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,svg,avif,webp}', {
  eager: true,
  import: 'default',
});

const imageUrls = Object.values(imageModules).filter(
  (src) => !src.includes('vite.svg') && !src.includes('react.svg'),
);

const storyImages = imageUrls.slice(0, 4);

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-8 page-background px-4 py-6 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-[2rem] border border-coffee-dark/10 bg-white/85 p-6 shadow-xl shadow-coffee-dark/10 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-coffee-dark">
              About Brew Haven
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-coffee-dark sm:text-5xl">
              Our story is about craft, comfort, and community.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-zinc-700 sm:text-base">
              Brew Haven began as a small coffee dream with one goal: to create a place where every cup feels intentional, cozy, and memorable. We source beans with care and serve them in a warm, elegant environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to="/" variant="secondary">
                Back Home
              </Button>
              <Button to="/menu" variant="primary">
                View Menu
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {storyImages.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-[1.75rem] border border-coffee-dark/10 bg-coffee-light shadow-sm">
                <img src={src} alt={`Story visual ${index + 1}`} className="full-image" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] border border-coffee-dark/10 bg-white/85 p-6 shadow-xl shadow-coffee-dark/10 backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-coffee-dark">
            Our Values
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-coffee-dark">What makes Brew Haven special</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: '☕',
              title: 'Quality',
              subtitle: 'Premium beans',
              copy: 'We source the finest beans and roast them for richness and balance.',
            },
            {
              icon: '🥛',
              title: 'Comfort',
              subtitle: 'Cozy atmosphere',
              copy: 'A warm environment designed for relaxing, working, and enjoying coffee.',
            },
            {
              icon: '🌿',
              title: 'Sustainability',
              subtitle: 'Ethical sourcing',
              copy: 'We partner with responsible producers and support sustainable practices.',
            },
            {
              icon: '🤝',
              title: 'Community',
              subtitle: 'Local connection',
              copy: 'Creating a place where coffee lovers come together and feel welcome.',
            },
          ].map((value) => (
            <article key={value.title} className="rounded-[1.75rem] border border-coffee-dark/10 bg-coffee-light p-5 shadow-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-beige text-3xl">
                {value.icon}
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-coffee-dark">
                {value.subtitle}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-coffee-dark">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-700">{value.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;