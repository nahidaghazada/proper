import { useState } from "react"
import { useGetCategoriesQuery } from "../../../services/categoriesApi"
import CategoryItem from "./CategoryItem"
import CategoryAddModal from "./CategoryAddModal"
import { Toaster } from "react-hot-toast"

function AdminCategory() {
  const { data: categories } = useGetCategoriesQuery()
  const [addModalOpen, setAddModalOpen] = useState(false)

  return (
    <>
      <Toaster position="top-right"
        toastOptions={{duration: 3000,
          style: { background: "#1e2433", color: "#fff", border: "1px solid #2a3147" },
          success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }} />

      <CategoryAddModal isOpen={addModalOpen} parentId={null} onClose={() => setAddModalOpen(false)} />

      <section className="bg-[#1F2937] min-h-[92vh] h-full p-5">
        <div className="relative z-[#999]">
          <button onClick={() => setAddModalOpen(true)}
            className="absolute text-[#fff] top-0 right-2 rounded-md bg-[#65A30D] px-6 py-3 cursor-pointer hover:bg-lime-500 transition">
            Add Parent Category
          </button>
          <h1 className="text-[#fff] text-3xl text-center mb-5">All Category</h1>
        </div>
        <div>
          {categories?.length > 0 && categories.map((category) => (
            <CategoryItem key={category._id} categoryElement={category} />
          ))}
        </div>
      </section>
    </>
  )
}

export default AdminCategory
