import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-page text-zinc-900">
      <NavBar />
      <main className="pb-16 pt-28">
        <Outlet />
      </main>
      <footer className="border-t border-coffee-dark/10 bg-white/80 py-8 text-zinc-700">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-semibold text-coffee-dark">Brew Haven</p>
            <p className="text-sm text-zinc-600">Crafted specialty coffee with a warm, elegant atmosphere.</p>
          </div>
          <div className="grid gap-2 text-sm text-zinc-600 sm:grid-cols-3">
            <span>Open daily: 7am - 8pm</span>
            <span>Location: Downtown Coffee Street</span>
            <span>Contact: hello@brewhaven.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;