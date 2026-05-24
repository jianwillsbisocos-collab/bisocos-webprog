import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <Navbar />
      <main className="pt-20 pb-16 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


export default Layout;