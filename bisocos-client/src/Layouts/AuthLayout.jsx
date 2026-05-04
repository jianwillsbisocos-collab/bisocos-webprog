import { Outlet } from 'react-router-dom';



const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        <div className="hidden lg:block">
          <img
            src="https://img.freepik.com/premium-photo/pine-green-background_670382-209226.jpg?w=2000"
            alt="Developer coding"
            className="h-full w-full object-cover"
          />
        </div>

        <main className="flex items-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
</main>
      </div>
    </section>
  );
};


export default AuthLayout;