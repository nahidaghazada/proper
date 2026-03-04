import toast from "react-hot-toast"
import { useDeleteProductMutation } from "../../../services/productsApi"
import { IoCloseOutline } from "react-icons/io5"

function DeleteModal({ isOpen, onClose, product }) {
    const [deleteProduct] = useDeleteProductMutation()
    
    const handleDelete = async () => {
        try {
            await deleteProduct(product._id).unwrap()
            toast.success("Product deleted!")
            onClose()
        } catch (err) {
            toast.error(err?.data?.message || "Product deleted is failed ")
        }
    }

    if (!isOpen) return null
    return (
        <div className="fixed flex justify-center items-center inset-0 z-[999] bg-black/60">
            <div className="bg-[#1e2433] max-w-md w-full rounded-md py-5 px-6">
                <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-5">
                    <h2 className="text-white text-xl font-semibold">Delete Product</h2>
                    <button onClick={onClose}><IoCloseOutline size={26} className="text-[#fff] cursor-pointer" /></button>
                </div>
                <p className="text-gray-300 mb-2 text-center">Are you sure you want to delete this product?</p>
                <p className="text-white font-semibold text-lg mb-6 text-center">"{product?.title}"</p>
                <div className="flex items-center justify-evenly">
                    <button onClick={handleDelete}
                        className="cursor-pointer bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-2 rounded transition">
                        Delete
                    </button>
                    <button onClick={onClose} className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal