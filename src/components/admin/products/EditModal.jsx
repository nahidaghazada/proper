import toast from "react-hot-toast"
import { useUpdateProductMutation } from "../../../services/productsApi"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"

function EditModal({ isOpen, onClose, product }) {
    const [updateProduct] = useUpdateProductMutation()
    const [title, setTitle] = useState("")

    useEffect(() => { if (product) setTitle(product.title) }, [product])

    const handleSubmit = async () => {
        if (!title.trim()) return toast.error("Title cannot be empty.")
        try {
            await updateProduct({ id: product._id, title }).unwrap()
            toast.success("Product updated!")
            onClose()
        } catch (err) {
            toast.error(err?.data?.message || "Update error")
        }
    }

    if (!isOpen) return null
    return (
        <div className="fixed flex justify-center items-center inset-0 z-[999] bg-black/60">
            <div className="bg-[#1e2433] max-w-xl w-full rounded-md py-5 px-6">
                <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-5">
                    <h2 className="text-[#fff] text-xl font-semibold">Edit Product</h2>
                    <button onClick={onClose}><IoCloseOutline size={26} className="text-[#fff] cursor-pointer" /></button>
                </div>
                <p className="text-gray-400 text-xs mb-4">ID: {product?._id}</p>
                <div className="mb-5">
                    <label className="text-[#fff] text-sm mb-1 block">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#2a3147] text-[#fff] rounded px-3 py-2 outline-none border border-transparent focus:border-blue-500" />
                </div>
                <div className="flex gap-3">
                    <button onClick={handleSubmit}
                        className="bg-green-600 cursor-pointer hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded transition">
                        Save
                    </button>
                    <button onClick={onClose} className="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-6 py-2 rounded transition">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditModal