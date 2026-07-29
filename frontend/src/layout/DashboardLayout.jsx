import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#DB4444]">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Exclusive Control Panel</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
              Activity
            </button>
            <button className="rounded-3xl bg-[#DB4444] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#b63636]">
              New item
            </button>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Admin
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          © 2026 Exclusive. Dashboard management for products, categories, and storefront content.
        </div>
      </footer>
    </div>
  )
}

export default DashboardLayout;
