import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router'

const navItemClass = ({ isActive }) =>
  `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
    isActive ? 'bg-[#DB4444] text-white' : 'text-slate-700 hover:bg-slate-100'
  }`

const API_URL = import.meta.env.VITE_AUTH_URL

const Dashboard = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const loadStats = async () => {
    try {
      const [categoryRes, productRes, userRes] = await Promise.all([
        axios.get(`${API_URL}/category`),
        axios.get(`${API_URL}/product`),
        axios.get(`${API_URL}/users`),
      ])
      setCategory(categoryRes.data.category || [])
      setProducts(productRes.data.products || [])
      setUsers(userRes.data.users || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#DB4444]">Dashboard menu</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">Manage store</h2>
        </div>

        <nav className="space-y-3">
          <NavLink to="/dashboard" end className={navItemClass}>
            Overview
          </NavLink>
          <NavLink to="products" className={navItemClass}>
            Products
          </NavLink>
          <NavLink to="category" className={navItemClass}>
            Categories
          </NavLink>
          <NavLink to="content" className={navItemClass}>
            Storefront UI
          </NavLink>
          <NavLink to="users" className={navItemClass}>
            Users
          </NavLink>
        </nav>

        <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Exclusive admin</p>
          <p className="mt-2 leading-6">
            Change homepage banners, flash sales, about, contact, and footer to match the storefront design.
          </p>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#DB4444]">Hello Admin</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Dashboard overview</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {products.length} Products
              </div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {category.length} Categories
              </div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {users.length} Users
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <Outlet />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
