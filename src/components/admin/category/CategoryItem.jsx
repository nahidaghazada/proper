import { useState } from "react"
import CategoryAddModal from "./CategoryAddModal"
import CategoryEditModal from "./CategoryEditModal"
import CategoryDeleteModal from "./CategoryDeleteModal"

function CategoryItem({ categoryElement }) {
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    return (
        <section className="mb-3">
            <div className="p-3 mb-2 bg-gray-700 flex items-center justify-between text-[#fff] rounded-md">
                <div className="w-5/12 flex items-center justify-between">
                    <p>{categoryElement.name}</p>
                    <p>Order : {categoryElement.order}</p>
                </div>
                <div className="flex w-5/12 justify-end gap-3">
                    <button onClick={() => setAddModalOpen(true)}
                        className="bg-gray-500 px-3 cursor-pointer py-1 rounded-md hover:bg-gray-400 transition">
                        Add Child
                    </button>
                    <button onClick={() => setEditModalOpen(true)}
                        className="bg-lime-600 px-3 py-1 cursor-pointer rounded-md hover:bg-lime-500 transition">
                        Edit
                    </button>
                    <button onClick={() => setDeleteModalOpen(true)}
                        className="bg-red-600 cursor-pointer px-3 py-1 rounded-md hover:bg-red-500 transition">
                        Delete
                    </button>
                </div>
            </div>

            {categoryElement.children?.length > 0 && (
                <div className="pl-5 mt-2">
                    {categoryElement.children.map((child) => (
                        <CategoryItem key={child._id} categoryElement={child} />
                    ))}
                </div>
            )}

            <CategoryAddModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} parentId={categoryElement._id} />
            <CategoryEditModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} categoryId={categoryElement._id} categoryName={categoryElement.name} />
            <CategoryDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} categoryId={categoryElement._id} categoryName={categoryElement.name} />
        </section>
    )
}

export default CategoryItem