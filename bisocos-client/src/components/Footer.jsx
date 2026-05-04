import { Link } from 'react-router-dom';

const shopLinks = [
  { label: 'New Drops', to: '/articles' },
  { label: 'Best Sellers', to: '/articles/list' },
  { label: 'Jordan Collection', to: '/articles' },
  { label: 'SB Dunks', to: '/articles/list' },
  { label: 'Sale', to: '/about' },
];

const accountLinks = [
  { label: 'My Collection', to: '/articles' },
  { label: 'Wishlist', to: '/articles/list' },
  { label: 'Order History', to: '/about' },
  { label: 'Track Order', to: '/about' },
  { label: 'Settings', to: '/about' },
];

const supportLinks = [
  { label: 'Contact Us', to: '/about' },
  { label: 'Shipping Info', to: '/about' },
  { label: 'Returns', to: '/about' },
  { label: 'Size Guide', to: '/about' },
  { label: 'FAQ', to: '/articles' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 text-xl font-bold text-zinc-900">
              <span className="text-2xl">👟</span>
              Sneaker Hub
            </Link>
            <p className="max-w-xs text-sm leading-6 text-zinc-600">
              Curated heat, rare drops, and authentic streetwear culture. Every step tells a story.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.target || '_self'}
                  rel={s.rel || ''}
                  aria-label={s.name}
                  className="rounded-full border-2 border-zinc-900 p-2 text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
              Shop
            </p>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-zinc-600 transition hover:text-amber-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
              Account
            </p>
            <ul className="space-y-2">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-zinc-600 transition hover:text-amber-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-900">
              Support
            </p>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-zinc-600 transition hover:text-amber-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-200 pt-8 mt-8 text-center">
          <p className="text-xs text-zinc-500 mb-2">
            &copy; 2024 Sneaker Hub. Your premier destination for authentic sneakers, Jordan retros, SB Dunks, and streetwear essentials. Curated drops from Nike, Jordan, Supreme, and more.
          </p>
          <p className="text-xs text-zinc-400">
            Every pair tells a story. Step into the culture.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

