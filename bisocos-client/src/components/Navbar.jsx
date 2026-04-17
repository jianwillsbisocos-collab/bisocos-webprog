const links = [
  { label: 'Home', to: '#hero' },
  { label: 'Menu', to: '#menu' },
  { label: 'Articles', to: '#articles' },
];

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-3 text-xl font-bold text-zinc-950">
          <span>☕</span>
          Brew Haven
        </a>

        <nav className="hidden items-center gap-3 text-sm uppercase tracking-[0.35em] text-zinc-600 md:flex">
          {links.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="rounded-full border border-transparent px-4 py-2 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
