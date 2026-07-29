import React, { useState } from 'react'

const ProductForm = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Product submitted', values)
    // TODO: connect to API or Redux action
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-3xl shadow-lg text-slate-900">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-semibold">Add New Product</h2>
        <p className="mt-2 text-sm text-slate-500">Fill in the product details and click submit to add a new product.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">Product Title</span>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Example: Wireless Headphones"
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">Category</span>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="beauty">Beauty</option>
            </select>
          </label>
        </div>

        <label className="space-y-2">
          <span className="block text-sm font-medium text-slate-700">Description</span>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Write a short product description"
            rows={4}
            className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </label>

        <div className="grid gap-6 md:grid-cols-3">
          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">Price</span>
            <input
              type="number"
              name="price"
              value={values.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
              placeholder="Quantity"
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-medium text-slate-700">Image URL</span>
            <input
              type="url"
              name="image"
              value={values.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Optional: preview the product image after uploading.</p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b63636] focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
