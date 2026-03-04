import { IoClose } from "react-icons/io5"
import { useDeleteCategoryMutation } from "../../../services/categoriesApi"
import toast from "react-hot-toast"

function CategoryDeleteModal({ isOpen, onClose, categoryId, categoryName }) {
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleConfirm = async () => {
    try {
      await deleteCategory(categoryId).unwrap()
      toast.success("Category deleted successfully!")
      onClose()
    } catch (err) {
      toast.error("Failed to delete category!")
      console.error("Delete category error:", err)
    }
  }

  return (
    <div className={`fixed inset-0 z-[999] bg-black/50 flex justify-center items-center transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div className={`bg-gray-700 p-5 rounded-md max-w-sm w-full transition-all duration-300 ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-4">
          <p className="text-gray-50 text-lg font-medium">Delete Category</p>
          <button onClick={onClose}>
            <IoClose className="w-6 h-6 text-gray-50 cursor-pointer" />
          </button>
        </div>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete{" "}
          <span className="text-[#fff] font-semibold">"{categoryName}"</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose}
            className="bg-gray-500 text-[#fff] cursor-pointer px-4 py-2 rounded-md hover:bg-gray-400 transition">
            Cancel
          </button>
          <button onClick={handleConfirm}
            className="bg-red-600 text-[#fff] cursor-pointer px-4 py-2 rounded-md hover:bg-red-500 transition disabled:opacity-50">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryDeleteModal