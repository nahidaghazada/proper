import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { useAddCategoryMutation } from "../../../services/categoriesApi"
import toast from "react-hot-toast"

function CategoryAddModal({ isOpen, onClose, parentId }) {
    const [name, setName] = useState("")
    const [order, setOrder] = useState("")
    const [addCategory] = useAddCategoryMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addCategory({
                name, order: Number(order), parentId: parentId || null,
            }).unwrap()
            toast.success("Category added successfully!")
            onClose()
            setName("")
            setOrder("")
        } catch (err) {
            toast.error("Failed to add category!")
            console.error("Add category error:", err)
        }
    }

    return (
        <>
            <section className={`fixed inset-0 z-[999] bg-black/50 flex justify-center items-center transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
                <div
                    className={`bg-gray-700 p-4 rounded-md max-w-md w-full transition-all duration-300 ${isOpen ? "translate-y-0" : "-translate-y-full"
                        }`}>
                    <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-4">
                        <p className="text-gray-50 text-lg font-medium">Add Category</p>
                        <button onClick={onClose}>
                            <IoClose className="cursor-pointer w-6 h-6 text-gray-50" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Category Name</label>
                            <input type="text" value={name} required placeholder="Category name"
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-600 text-white px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-lime-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Category Order</label>
                            <input type="number" value={order} placeholder="Category Order"
                                onChange={(e) => setOrder(e.target.value)}
                                className="bg-gray-600 text-white px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-lime-500" />
                        </div>
                        {parentId && (
                            <p className="text-gray-400 text-xs">Parent ID: {parentId}</p>
                        )}
                        <button type="submit"
                            className="bg-lime-600 cursor-pointer text-white py-2 rounded-md hover:bg-lime-500 transition disabled:opacity-50">
                            Add Category
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CategoryAddModal