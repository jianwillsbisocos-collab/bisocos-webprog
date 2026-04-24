import { Outlet, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="fixed top-0 left-0 z-50 p-4 sm:p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600 transition hover:border-zinc-900 hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <main className="flex min-h-screen items-start justify-center px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
