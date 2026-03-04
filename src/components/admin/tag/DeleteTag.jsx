import { IoCloseOutline } from "react-icons/io5"

function DeleteTagModal({ isOpen, onClose, tag, onDelete }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="relative bg-[#1e2433] w-full max-w-md rounded-md p-6">
                <button onClick={onClose}
                    className="absolute top-4 right-4 text-white transition cursor-pointer">
                    <IoCloseOutline size={26} />
                </button>
                <h2 className="text-white text-xl mb-6">
                    Delete Tag
                </h2>
                <p className="text-gray-300 mb-4 text-center">
                    Are you sure you want to delete:
                </p>
                <p className="text-white font-semibold text-lg mb-6 text-center">
                    "{tag?.name}"
                </p>
                <div className="flex justify-evenly">
                    <button onClick={() => onDelete(tag._id)}
                        className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded">
                        Delete
                    </button>
                    <button onClick={onClose}
                        className="cursor-pointer bg-gray-500 text-white px-6 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTagModal