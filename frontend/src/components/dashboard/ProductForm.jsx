import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";

const API_URL = import.meta.env.VITE_AUTH_URL;

const emptyForm = {
  title: "",
  description: "",
  category: "",
  price: "",
  stock: "",
  review: "",
  discountPercentage: "",
  isFlashSale: false,
  isBestSelling: false,
  isNewArrival: false,
  colours: [""],
  size: [""],
  images: [{ url: "" }],
};

const inputClass =
  "w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const Modal = ({ title, subtitle, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-xl">
      <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary">{subtitle}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <FiX size={20} />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [values, setValues] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product`);
      setProducts(response.data.products || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category`);
      setCategories(response.data.category || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setValues(emptyForm);
    setFormOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product._id);
    setValues({
      title: product.title || "",
      description: product.description || "",
      category: product.category || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      review: product.review ?? "",
      discountPercentage: product.discountPercentage ?? "",
      isFlashSale: Boolean(product.isFlashSale),
      isBestSelling: Boolean(product.isBestSelling),
      isNewArrival: Boolean(product.isNewArrival),
      colours: product.colours?.length ? product.colours : [""],
      size: product.size?.length ? product.size : [""],
      images: product.images?.length ? product.images : [{ url: "" }],
    });
    setFormOpen(true);
  };

  const closeFormModal = () => {
    setFormOpen(false);
    setEditingId(null);
    setValues(emptyForm);
  };

  const openDeleteModal = (product) => {
    setDeleteTarget(product);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
    setDeleteOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleImageChange = (index, value) => {
    setValues((prev) => ({
      ...prev,
      images: prev.images.map((item, i) => (i === index ? { url: value } : item)),
    }));
  };

  const addArrayItem = (field, defaultValue = "") => {
    setValues((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setValues((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addImageField = () => {
    setValues((prev) => ({
      ...prev,
      images: [...prev.images, { url: "" }],
    }));
  };

  const removeImageField = (index) => {
    setValues((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const buildPayload = () => ({
    title: values.title.trim(),
    description: values.description.trim(),
    category: values.category,
    price: Number(values.price),
    stock: Number(values.stock),
    review: Number(values.review),
    discountPercentage: Number(values.discountPercentage || 0),
    isFlashSale: Boolean(values.isFlashSale),
    isBestSelling: Boolean(values.isBestSelling),
    isNewArrival: Boolean(values.isNewArrival),
    colours: values.colours.map((c) => c.trim()).filter(Boolean),
    size: values.size.map((s) => s.trim()).filter(Boolean),
    images: values.images.map((img) => ({ url: img.url.trim() })).filter((img) => img.url),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = buildPayload();

    try {
      const response = editingId
        ? await axios.put(`${API_URL}/product/${editingId}`, payload)
        : await axios.post(`${API_URL}/product/add`, payload);

      toast(response.data.message);

      if (response.data.success) {
        closeFormModal();
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const response = await axios.delete(`${API_URL}/product/${deleteTarget._id}`);
      toast(response.data.message);

      if (response.data.success) {
        closeDeleteModal();
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Product section</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Manage Products</h2>
          <p className="mt-1 text-sm text-slate-500">Add, edit, or remove products from your store.</p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b63636]"
        >
          <FiPlus size={16} />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-4 font-semibold">Image</th>
              <th className="px-4 py-4 font-semibold">Title</th>
              <th className="px-4 py-4 font-semibold">Category</th>
              <th className="px-4 py-4 font-semibold">Price</th>
              <th className="px-4 py-4 font-semibold">Stock</th>
              <th className="px-4 py-4 font-semibold">Review</th>
              <th className="px-4 py-4 font-semibold">Home</th>
              <th className="px-4 py-4 font-semibold">Colours</th>
              <th className="px-4 py-4 font-semibold">Size</th>
              <th className="px-4 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan="10" className="px-4 py-10 text-center text-slate-500">
                    Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-4 py-10 text-center text-slate-500">
                  No products found. Click &quot;Add Product&quot; to create one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">
                    {product.images?.[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="max-w-[180px] truncate px-4 py-4 font-medium text-slate-900">
                    {product.title}
                  </td>
                  <td className="px-4 py-4 capitalize text-slate-600">{product.category}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">${product.price}</td>
                  <td className="px-4 py-4 text-slate-600">{product.stock}</td>
                  <td className="px-4 py-4 text-slate-600">{product.review}</td>
                  <td className="px-4 py-4 text-xs text-slate-600">
                    {[product.isFlashSale && "Flash", product.isBestSelling && "Best", product.isNewArrival && "New"].filter(Boolean).join(", ") || "-"}
                  </td>
                  <td className="max-w-[120px] truncate px-4 py-4 text-slate-600">
                    {product.colours?.join(", ") || "-"}
                  </td>
                  <td className="max-w-[120px] truncate px-4 py-4 text-slate-600">
                    {product.size?.join(", ") || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-primary hover:text-primary"
                      >
                        <FiEdit2 size={14} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(product)}
                        className="inline-flex items-center gap-1 rounded-2xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <Modal
          title={editingId ? "Edit Product" : "Add New Product"}
          subtitle={editingId ? "Update product" : "Create product"}
          onClose={closeFormModal}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Product Title</span>
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Title 02"
                  className={inputClass}
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Category</span>
                <select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="space-y-2">
              <span className="block text-sm font-medium text-slate-700">Description</span>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Write product description..."
                rows={4}
                className={inputClass}
                required
              />
            </label>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Price</span>
                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  placeholder="200"
                  min="0"
                  className={inputClass}
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Stock</span>
                <input
                  type="number"
                  name="stock"
                  value={values.stock}
                  onChange={handleChange}
                  placeholder="10"
                  min="0"
                  className={inputClass}
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Review</span>
                <input
                  type="number"
                  name="review"
                  value={values.review}
                  onChange={handleChange}
                  placeholder="3"
                  min="0"
                  max="5"
                  step="0.1"
                  className={inputClass}
                  required
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Discount %</span>
                <input
                  type="number"
                  name="discountPercentage"
                  value={values.discountPercentage}
                  onChange={handleChange}
                  placeholder="40"
                  min="0"
                  max="100"
                  className={inputClass}
                />
              </label>
              <div className="flex flex-wrap items-center gap-4 pt-7 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={values.isFlashSale} onChange={(e) => setValues((prev) => ({ ...prev, isFlashSale: e.target.checked }))} />
                  Flash Sale
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={values.isBestSelling} onChange={(e) => setValues((prev) => ({ ...prev, isBestSelling: e.target.checked }))} />
                  Best Selling
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={values.isNewArrival} onChange={(e) => setValues((prev) => ({ ...prev, isNewArrival: e.target.checked }))} />
                  Our Products / New
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Image URLs</span>
                <button
                  type="button"
                  onClick={addImageField}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  <FiPlus size={14} />
                  Add Image
                </button>
              </div>
              {values.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={image.url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://images.pexels.com/..."
                    className={inputClass}
                    required
                  />
                  {values.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="rounded-2xl border border-slate-200 px-3 text-slate-500 hover:bg-slate-50"
                    >
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Colours</span>
                  <button
                    type="button"
                    onClick={() => addArrayItem("colours")}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <FiPlus size={14} />
                    Add Colour
                  </button>
                </div>
                {values.colours.map((colour, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={colour}
                      onChange={(e) => handleArrayChange("colours", index, e.target.value)}
                      placeholder="red"
                      className={inputClass}
                      required
                    />
                    {values.colours.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("colours", index)}
                        className="rounded-2xl border border-slate-200 px-3 text-slate-500 hover:bg-slate-50"
                      >
                        <FiX size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Sizes</span>
                  <button
                    type="button"
                    onClick={() => addArrayItem("size")}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <FiPlus size={14} />
                    Add Size
                  </button>
                </div>
                {values.size.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange("size", index, e.target.value)}
                      placeholder="M"
                      className={inputClass}
                      required
                    />
                    {values.size.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("size", index)}
                        className="rounded-2xl border border-slate-200 px-3 text-slate-500 hover:bg-slate-50"
                      >
                        <FiX size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={closeFormModal}
                className="rounded-3xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b63636] disabled:opacity-60"
              >
                {submitting ? "Saving..." : editingId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiTrash2 size={22} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Delete Product</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">&quot;{deleteTarget.title}&quot;</span>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-3xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-3xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
