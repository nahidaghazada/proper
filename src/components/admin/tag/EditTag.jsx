import { useUpdateTagsMutation } from "../../../services/tagApi"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { IoCloseOutline } from "react-icons/io5"

function EditTagModal({ isOpen, onClose, tag }) {
    const [updateTag] = useUpdateTagsMutation()
    const [name, setName] = useState("")

    useEffect(() => {
        if (tag) { setName(tag.name) }
    }, [tag])

    const handleUpdate = async () => {
        if (!name.trim()) {
            toast.error("Tag name is required")
            return
        }
        try {
            await updateTag({ id: tag._id, data: { name } }).unwrap()
            toast.success("Tag updated successfully")
            onClose()
        } catch {
            toast.error("Tag update failed")
        }
    }
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="relative bg-[#1e2433] w-full max-w-md rounded-md p-6">
                <button onClick={onClose}
                    className="absolute top-4 right-4 text-[#fff] transition cursor-pointer">
                    <IoCloseOutline size={26} />
                </button>
                <h2 className="text-[#fff] text-xl mb-6">
                    Edit Tag
                </h2>
                <input value={name} onChange={(e) => setName(e.target.value)}
                    className="text-[#fff] w-full px-3 py-2 border border-gray-400 rounded mb-4 bg-[#1e2433] focus:outline-none focus:border-blue-500" />
                <div className="flex justify-between">
                    <button onClick={handleUpdate}
                        className="cursor-pointer bg-blue-600 text-[#fff] px-6 py-2 rounded">
                        Save
                    </button>
                    <button onClick={onClose}
                        className="cursor-pointer bg-gray-500 text-[#fff] px-6 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditTagModal