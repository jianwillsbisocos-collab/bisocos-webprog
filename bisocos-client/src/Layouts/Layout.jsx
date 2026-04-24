import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;