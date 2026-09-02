import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const API_URL = import.meta.env.VITE_AUTH_URL;

const Overview = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [productRes, categoryRes, userRes] = await Promise.all([
          axios.get(`${API_URL}/product`),
          axios.get(`${API_URL}/category`),
          axios.get(`${API_URL}/users`),
        ]);
        setProducts(productRes.data.products || []);
        setCategories(categoryRes.data.category || []);
        setUsers(userRes.data.users || []);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  const cards = [
    { label: "Products", value: products.length, to: "/dashboard/products" },
    { label: "Flash sale items", value: products.filter((item) => item.isFlashSale).length, to: "/dashboard/products" },
    { label: "Best selling", value: products.filter((item) => item.isBestSelling).length, to: "/dashboard/products" },
    { label: "Categories", value: categories.length, to: "/dashboard/category" },
    { label: "Customers", value: users.filter((item) => item.role !== "admin").length, to: "/dashboard/users" },
    { label: "Storefront copy", value: "Edit UI", to: "/dashboard/content" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Overview</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Control Exclusive from here</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage the same sections shown on the homepage, shop, about, contact, and footer.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <NavLink
            key={card.label}
            to={card.to}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-primary hover:bg-white"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Overview;
