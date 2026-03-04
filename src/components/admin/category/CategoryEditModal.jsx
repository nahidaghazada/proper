import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5"
import { useEditCategoryMutation } from "../../../services/categoriesApi"
import toast from "react-hot-toast"

function CategoryEditModal({ isOpen, onClose, categoryId, categoryName }) {
    const [name, setName] = useState("")
    const [order, setOrder] = useState("")
    const [editCategory] = useEditCategoryMutation()

    useEffect(() => {
        if (isOpen) setName(categoryName || "")
    }, [isOpen, categoryName])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await editCategory({ id: categoryId, order: Number(order), name }).unwrap()
            toast.success("Category updated successfully!")
            onClose()
            setOrder("")
        } catch (err) {
            toast.error("Failed to update category!")
            console.error("Edit category error:", err)
        }
    }

    return (
        <>
            <section className={`fixed inset-0 z-[999] bg-black/50 flex justify-center items-center transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
                <div
                    className={`bg-gray-600 p-4 rounded-md max-w-md w-full transition-all duration-300 ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
                    <div className="flex items-center justify-between border-b border-gray-500 pb-2 mb-4">
                        <p className="text-gray-50 text-lg font-medium">Edit Category</p>
                        <button onClick={onClose}>
                            <IoClose className="w-6 h-6 text-gray-50 cursor-pointer" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Category Name</label>
                            <input type="text" value={name} required
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-700 text-[#fff] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-lime-500" />
                            <label className="text-gray-300 text-sm">Category Order</label>
                            <input type="number" value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="bg-gray-700 text-[#fff] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-lime-500" />
                        </div>
                        <button type="submit"
                            className="bg-lime-600 cursor-pointer text-[#fff] py-2 rounded-md hover:bg-lime-500 transition disabled:opacity-50">
                            Edit Category
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CategoryEditModal