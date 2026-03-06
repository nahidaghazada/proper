import { useState } from "react"
import { useGetCommentsQuery, useCreateCommentMutation } from "../../services/commentApi"
import toast from "react-hot-toast"

function DetailComment({ productId }) {
    const [content, setContent] = useState("")
    const [page, setPage] = useState(1)
    const { data } = useGetCommentsQuery({ productId, page })
    const [createComment, { isLoading: isAdding }] = useCreateCommentMutation()

    const handleAddComment = async () => {
        if (!content.trim()) return
        try {
            await createComment({ productId, content }).unwrap()
            setContent("")
            toast.success("Comment added")
        } catch {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-end mb-8">
                <div className="flex-1 w-full">
                    <input type="text" value={content} placeholder="Write a Comment..."
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border-b-2 border-gray-300 bg-transparent py-2 focus:border-black outline-none transition" />
                </div>
                <button onClick={handleAddComment} disabled={isAdding}
                    className="bg-black cursor-pointer text-[#fff] px-8 py-2 rounded-full text-sm font-bold hover:bg-gray-800 disabled:opacity-60 flex items-center gap-2">
                    {isAdding && (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                    )}
                    {isAdding ? "Adding..." : "Add"}
                </button>
            </div>

            {data?.comments?.length === 0 ? (
                <p className="text-gray-400 italic">There are no reviews yet. Be the first!</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {data?.comments?.map((comment) => (
                        <div key={comment._id} className="bg-white p-4 rounded-xl border border-gray-100">
                            <p className="text-sm font-semibold text-gray-700">{comment.userId?.firstName} {comment.userId?.lastName}</p>
                            <p className="text-gray-600 mt-1">{comment.content}</p>
                        </div>
                    ))}
                    {data?.totalPages > 1 && (
                        <div className="flex gap-2 mt-4">
                            {Array.from({ length: data.totalPages }, (_, i) => (
                                <button key={i} onClick={() => setPage(i + 1)}
                                    className={`px-3 py-1 rounded-full text-sm ${page === i + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default DetailComment