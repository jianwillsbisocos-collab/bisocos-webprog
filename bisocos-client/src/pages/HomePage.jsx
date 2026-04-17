import Button from '../components/Button';
import heroImage from '../assets/coffee5.webp';
import menuImage1 from '../assets/coffee1.jpg';
import menuImage2 from '../assets/coffee3.jpg';
import menuImage3 from '../assets/coffee4.jpg';
import menuImage4 from '../assets/caramel.jpg';
import menuImage5 from '../assets/coffee6.jpg';
import menuImage6 from '../assets/coffe.jpg';

const stats = [
  { value: '12', label: 'Projects' },
  { value: '08', label: 'Sections' },
  { value: '24', label: 'Screens' },
  { value: '04', label: 'Layouts' },
];

const menuItems = [
  {
    title: 'Caramel Cloud Latte',
    description: 'Velvety espresso with caramel and steamed milk, topped with sweet foam.',
    price: '$6.99',
    image: menuImage4,
  },
  {
    title: 'Hazelnut Mocha',
    description: 'Rich chocolate and hazelnut syrup combined with a bold espresso shot.',
    price: '$7.49',
    image: menuImage1,
  },
  {
    title: 'Vanilla Bean Cappuccino',
    description: 'Smooth cappuccino infused with real vanilla beans and silky foam.',
    price: '$6.49',
    image: menuImage2,
  },
  {
    title: 'Cold Brew Dream',
    description: 'Slow-steeped cold brew with a hint of oat milk and a crisp finish.',
    price: '$5.99',
    image: menuImage5,
  },
  {
    title: 'Espresso Shot',
    description: 'Pure, bold espresso served with the perfect crema every time.',
    price: '$3.50',
    image: menuImage3,
  },
  {
    title: 'Seasonal Treat',
    description: 'A rotating pastry offering inspired by our coffee menu.',
    price: '$4.75',
    image: menuImage6,
  },
];

const features = [
  {
    title: 'Wireframe layout basics',
    description: 'A simple placeholder for a featured article with image, title, and short copy.',
    image: menuImage1,
    caption: 'Fresh espresso inspirations',
  },
  {
    title: 'Building clean sections',
    description: 'Another card using the same layout pattern for a consistent article grid.',
    image: menuImage2,
    caption: 'Cozy café moments',
  },
  {
    title: 'Using cards and lists',
    description: 'The same low-fidelity treatment keeps the card section easy to scan.',
    image: menuImage3,
    caption: 'Baked goods and warm flavors',
  },
  {
    title: 'Low-fidelity article flow',
    description: 'A final article card to complete the featured grid layout.',
    image: menuImage4,
    caption: 'Creamy coffee indulgence',
  },
];

const HomePage = () => {
  return (
    <div className="page-background min-h-screen px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <section id="hero" className="rounded-[2rem] border border-zinc-300 bg-white p-8 shadow-[0_26px_80px_-40px_rgba(0,0,0,0.18)]">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                Brew Haven
              </p>
              <h1 className="max-w-3xl text-5xl font-bold leading-tight text-zinc-950 sm:text-6xl">
                Welcome to Brew Haven Studio
              </h1>
              <p className="max-w-xl text-base leading-8 text-zinc-600 sm:text-lg">
                More than just a café, we are a hub for digital innovation. Join a community of builders and designers committed to excellence, one handcrafted cup at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="#menu" variant="primary" className="rounded-full px-6 py-3 text-sm">
                  View Menu
                </Button>
                <Button to="#articles" variant="secondary" className="rounded-full px-6 py-3 text-sm">
                  Read Articles
                </Button>
              </div>
            </div>

            <div className="wireframe-hero-panel mx-auto rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-100 p-6">
              <img src={heroImage} alt="Coffee hero" className="wireframe-hero-image rounded-[1.5rem]" />
            </div>
          </div>
        </section>

        <section id="menu" className="rounded-[2rem] border border-zinc-300 bg-white p-8 shadow-[0_26px_80px_-40px_rgba(0,0,0,0.18)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Our Menu
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-zinc-950">Carefully curated coffee selections</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
            From classic espressos to innovative specialty drinks, our menu features the finest coffees sourced from around the world, prepared with passion and precision.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {menuItems.map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-zinc-300 bg-zinc-50 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="overflow-hidden rounded-t-[2rem]">
                  <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-zinc-950">{item.title}</h3>
                    <span className="text-sm font-semibold text-zinc-700">{item.price}</span>
                  </div>
                  <p className="text-sm leading-7 text-zinc-600">{item.description}</p>
                  <Button className="rounded-full border-zinc-900 bg-white px-6 py-3 text-sm text-zinc-900" variant="secondary">
                    Add to Order
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="articles" className="rounded-[2rem] border border-zinc-300 bg-white p-8 shadow-[0_26px_80px_-40px_rgba(0,0,0,0.18)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-zinc-950">Article card grid</h2>
          <div className="mt-8 grid gap-6 xl:grid-cols-4">
            {features.map((feature) => (
              <article key={feature.title} className="flex h-full flex-col rounded-[2rem] border border-zinc-300 bg-zinc-50 p-6 shadow-sm">
                <img src={feature.image} alt={feature.title} className="mb-3 h-44 w-full rounded-[1.5rem] object-cover" />
                <p className="mb-5 text-sm italic text-zinc-600">{feature.caption}</p>
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Article</p>
                <h3 className="mt-3 text-xl font-semibold text-zinc-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{feature.description}</p>
                <div className="mt-auto">
                  <Button className="mt-6 rounded-full border-zinc-900 bg-white px-6 py-3 text-sm text-zinc-900" variant="secondary">
                    Read More
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;