import { useGetTagsQuery, useCreateTagsMutation, useDeleteTagsMutation } from "../../../services/tagApi"
import { useState } from "react"
import EditTagModal from "./EditTag"
import DeleteTagModal from "./DeleteTag"
import toast, { Toaster } from "react-hot-toast"

function AdminTag() {
  const { data: tags = [] } = useGetTagsQuery()
  const [createTag] = useCreateTagsMutation()
  const [deleteTag] = useDeleteTagsMutation()
  const [createName, setCreateName] = useState("")
  const [editModal, setEditModal] = useState({ open: false, tag: null })
  const [deleteModal, setDeleteModal] = useState({ open: false, tag: null })

  const handleCreate = async () => {
    if (!createName.trim()) {
      toast.error("Tag name is required")
      return
    }
    try {
      await createTag({ name: createName }).unwrap()
      toast.success("Tag created successfully")
      setCreateName("")
    } catch {
      toast.error("Tag create failed")
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTag(id).unwrap()
      toast.success("Tag deleted successfully")
      setDeleteModal({ open: false, tag: null })
    } catch {
      toast.error("Tag delete failed")
    }
  }

  return (
    <section className="min-h-screen p-5 bg-gray-800">
      <Toaster position="top-right"
        containerStyle={{ zIndex: 9999 }}
        toastOptions={{
          duration: 3000,
          style: { background: "#1e2433", color: "#fff", border: "1px solid #2a3147" },
          success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }} />

      <EditTagModal isOpen={editModal.open} tag={editModal.tag}
        onClose={() => setEditModal({ open: false, tag: null })} />

      <DeleteTagModal onDelete={handleDelete} isOpen={deleteModal.open} tag={deleteModal.tag}
        onClose={() => setDeleteModal({ open: false, tag: null })} />
      <h1 className="text-center text-gray-50 text-3xl font-medium mb-10">
        Tags
      </h1>

      <div className="flex">
        <div className="w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            {tags.map((tag, index) => (
              <div key={tag._id}
                className="flex mb-4 px-4 py-2 rounded-md bg-gray-500 justify-between items-center">
                <p className="text-gray-50 text-lg">
                  {index + 1}) {tag.name}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditModal({ open: true, tag })}
                    className="cursor-pointer px-4 py-2 bg-blue-600 text-[#fff] rounded-md">
                    Edit
                  </button>
                  <button onClick={() => setDeleteModal({ open: true, tag })}
                    className="cursor-pointer px-4 py-2 bg-red-600 text-[#fff] rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-start">
          <div className="w-72">
            <label className="text-[#fff] block mb-2">
              Tag name *
            </label>
            <input value={createName} placeholder="Tag name"
              onChange={(e) => setCreateName(e.target.value)}
              className="bg-[#fff] block w-full px-3 py-2 rounded mb-4" />
            <button onClick={handleCreate}
              className="cursor-pointer block w-full rounded-md bg-gray-500 text-[#fff] py-2">
              Add Tag
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminTag