import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const API_URL = import.meta.env.VITE_AUTH_URL;

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category`);
      setCategories(response.data.category || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = editingId
        ? await axios.put(`${API_URL}/category/${editingId}`, { categoryName })
        : await axios.post(`${API_URL}/category`, { categoryName });
      toast(response.data.message);
      if (response.data.success) {
        setCategoryName("");
        setEditingId(null);
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await axios.delete(`${API_URL}/category/${deleteTarget._id}`);
      toast(response.data.message);
      if (response.data.success) {
        setDeleteTarget(null);
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#DB4444]">Category section</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            {editingId ? "Edit category" : "Create a new category"}
          </h2>
        </div>

        <form className="grid gap-5 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">Category name</span>
            <input
              type="text"
              placeholder="Example: Electronics"
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/20"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </label>

          <div className="flex gap-2">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setCategoryName("");
                }}
                className="h-14 rounded-3xl border border-slate-300 px-6 text-sm font-semibold"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="h-14 rounded-3xl bg-[#DB4444] px-6 text-sm font-semibold text-white transition hover:bg-[#b63636]"
            >
              {editingId ? "Update" : "Add Category"}
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-4 font-semibold">Category</th>
              <th className="px-4 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {categories.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-4 py-10 text-center text-slate-500">No categories yet.</td>
              </tr>
            ) : (
              categories.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-4 font-medium">{item.categoryName}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(item._id);
                          setCategoryName(item.categoryName);
                        }}
                        className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium"
                      >
                        <FiEdit2 size={14} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="inline-flex items-center gap-1 rounded-2xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600"
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-semibold">Delete Category</h3>
            <p className="mt-2 text-sm text-slate-600">
              Delete &quot;{deleteTarget.categoryName}&quot;? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setDeleteTarget(null)} className="rounded-3xl border px-5 py-2.5 text-sm font-semibold">
                Cancel
              </button>
              <button type="button" onClick={handleDelete} className="rounded-3xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
