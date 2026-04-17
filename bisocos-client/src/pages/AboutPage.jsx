import Button from '../components/Button';

const imageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,svg,avif,webp}', {
  eager: true,
  import: 'default',
});

const imageUrls = Object.values(imageModules).filter(
  (src) => !src.includes('vite.svg') && !src.includes('react.svg'),
);

const menuItems = [
  {
    title: 'Caramel Cloud Latte',
    description: 'Velvety espresso with caramel and steamed milk, topped with sweet foam.',
    price: '$6.99',
    image: imageUrls[1] || imageUrls[0],
  },
  {
    title: 'Hazelnut Mocha',
    description: 'Rich chocolate and hazelnut syrup combined with a bold espresso shot.',
    price: '$7.49',
    image: imageUrls[2] || imageUrls[0],
  },
  {
    title: 'Vanilla Bean Cappuccino',
    description: 'Smooth cappuccino infused with real vanilla beans and silky foam.',
    price: '$6.49',
    image: imageUrls[3] || imageUrls[0],
  },
  {
    title: 'Cold Brew Dream',
    description: 'Slow-steeped cold brew with a hint of oat milk and a crisp finish.',
    price: '$5.99',
    image: imageUrls[4] || imageUrls[0],
  },
  {
    title: 'Espresso Shot',
    description: 'Pure, bold espresso served with the perfect crema every time.',
    price: '$3.50',
    image: imageUrls[5] || imageUrls[0],
  },
  {
    title: 'Seasonal Treat',
    description: 'A rotating pastry offering inspired by our coffee menu.',
    price: '$4.75',
    image: imageUrls[6] || imageUrls[0],
  },
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-8 page-background px-4 py-6 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-[2rem] border border-coffee-dark/10 bg-white/85 p-6 shadow-xl shadow-coffee-dark/10 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-coffee-dark">
              Our Menu
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-coffee-dark sm:text-4xl">
              Carefully Curated Coffee Selections
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-700 sm:text-base">
              From classic espressos to innovative specialty drinks, our menu features the finest coffees sourced from around the world, prepared with passion and precision.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button to="/" variant="secondary">
                Back Home
              </Button>
              <Button to="/about" variant="primary">
                Learn Our Story
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {imageUrls.slice(1, 5).map((src, index) => (
              <div key={index} className="overflow-hidden rounded-[1.75rem] border border-coffee-dark/10 bg-coffee-light shadow-sm">
                <img src={src} alt={`Menu highlight ${index + 1}`} className="full-image" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] border border-coffee-dark/10 bg-white/85 p-6 shadow-xl shadow-coffee-dark/10 backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-coffee-dark">
            Featured Drinks
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-coffee-dark">A menu worth savoring</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {menuItems.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] border border-coffee-dark/10 bg-coffee-light shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="h-56 overflow-hidden rounded-t-[1.75rem]">
                <img src={item.image} alt={item.title} className="full-image" />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-coffee-dark">{item.title}</h3>
                  <span className="text-sm font-semibold text-coffee-dark">{item.price}</span>
                </div>
                <p className="text-sm leading-6 text-zinc-700">{item.description}</p>
                <Button className="mt-3" variant="primary">
                  Add to Order
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;