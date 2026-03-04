import { useState } from "react"
import { useGetProductsQuery } from "../../../services/productsApi"
import { Toaster } from "react-hot-toast"
import AddVariantModal from "./AddVariantModal"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"
import { IoCloseOutline } from "react-icons/io5"
import AddProductForm from "./AddProductForm"

function AdminProducts() {
  const { data } = useGetProductsQuery()
  const products = data?.products
  const [search, setSearch] = useState("")
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [addVariantModal, setAddVariantModal] = useState({ open: false, product: null })
  const [editModal, setEditModal] = useState({ open: false, product: null })
  const [deleteModal, setDeleteModal] = useState({ open: false, product: null })

  const filtered = products?.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#141824] p-6">
      <Toaster position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#1e2433", color: "#fff", border: "1px solid #2a3147" },
          success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }} />

      <div className="flex justify-between items-center mb-6">
        <input type="text" placeholder="Write a title" value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border border-gray-600 text-[#fff] rounded px-4 py-2 w-64 outline-none focus:border-blue-400" />
        <h1 className="text-[#fff] text-2xl font-semibold">All Product</h1>
        <button onClick={() => setAddProductOpen(true)}
          className="cursor-pointer bg-green-600 hover:bg-green-700 text-[#fff] px-5 py-2 rounded transition font-semibold">
          Add Product
        </button>
      </div>

      <div className="rounded-lg overflow-hidden border border-[#2a3147]">
        <table className="w-full text-[#fff] text-sm">
          <thead>
            <tr className="bg-[#1e2433] text-gray-300">
              {["#", "Title", "Categories", "Variants", "Price", "Discount", "Tags", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered?.map((product, index) => {
              const firstVariant = product.variants?.[0]
              return (
                <tr key={product._id} className="border-t border-[#2a3147] hover:bg-[#1e2433] transition">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 max-w-[140px]">{product.title}</td>
                  <td className="px-4 py-4 text-gray-300">{product.categories?.map((c) => c.name).join(", ")}</td>
                  <td className="px-4 py-4 text-gray-300">{firstVariant?.slug || "-"}</td>
                  <td className="px-4 py-4">{firstVariant?.price || "-"}</td>
                  <td className="px-4 py-4">{firstVariant?.discount ?? "-"}</td>
                  <td className="px-4 py-4">{product.tags?.map((t) => t.name).join(", ")}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 items-center">
                      <button onClick={() => setAddVariantModal({ open: true, product })}
                        className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-[#fff] px-3 py-1.5 rounded text-xs transition whitespace-nowrap">
                        Add Variant
                      </button>
                      <button onClick={() => setEditModal({ open: true, product })}
                        className="cursor-pointer bg-green-600 hover:bg-green-700 text-[#fff] px-4 py-1.5 rounded text-xs transition">
                        Edit
                      </button>
                      <button onClick={() => setDeleteModal({ open: true, product })}
                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-[#fff] px-4 py-1.5 rounded text-xs transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {addProductOpen && (
        <div className="fixed flex justify-center items-center inset-0 z-[999] bg-black/60 p-4">
          <div className="bg-[#1e2433] max-w-xl w-full rounded-md flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-gray-600 py-4 px-6 flex-shrink-0">
              <h2 className="text-[#fff] text-xl font-semibold">Add Product</h2>
              <button onClick={() => setAddProductOpen(false)}>
                <IoCloseOutline size={26} className="text-[#fff] cursor-pointer" />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5" style={{ scrollbarWidth: "none" }}>
              <AddProductForm onClose={() => setAddProductOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <AddVariantModal isOpen={addVariantModal.open} onClose={() => setAddVariantModal({ open: false, product: null })} product={addVariantModal.product} />
      <EditModal isOpen={editModal.open} onClose={() => setEditModal({ open: false, product: null })} product={editModal.product} />
      <DeleteModal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, product: null })} product={deleteModal.product} />
    </div>
  )
}

export default AdminProducts