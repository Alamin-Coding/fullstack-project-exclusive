import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("")
  const addCategory = async ()=> {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/category", {
        categoryName:categoryName,
      })
      console.log(response)
      toast(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddCategory = (e) => {
    e.preventDefault()
    addCategory()
    console.log(categoryName)
  }
  return (
    <div className="max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[#DB4444]">Category section</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">Create a new category</h2>
      </div>

      <form className="grid gap-5 sm:grid-cols-[1fr_auto]">
        <label className="space-y-2">
          <span className="block text-sm font-medium text-slate-700">Category name</span>
          <input
            type="text"
            placeholder="Example: Electronics"
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/20"
            value={categoryName}
            onChange={(e)=> setCategoryName(e.target.value)}
          />
        </label>

        <button
          type="submit"
          onClick={handleAddCategory}
          className="h-14 rounded-3xl bg-[#DB4444] px-6 text-sm font-semibold text-white transition hover:bg-[#b63636]"
        >
          Add Category
        </button>
      </form>
    </div>
  )
}

export default CategoryForm
