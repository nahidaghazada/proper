import { useState } from "react"

function DetailComment({ productId }) {
    const [read, setRead] = useState(false)
    const [content, setContent] = useState("")
    const comments = []

    const handleAddComment = () => {
        if (!content.trim()) return
        setContent("")
    }

    return (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-end mb-8">
                <div className="flex-1 w-full">
                    <input type="text" value={content} placeholder="Write a Comment..."
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border-b-2 border-gray-300 bg-transparent py-2 focus:border-black outline-none transition" />
                </div>
                <button onClick={handleAddComment}
                    className="bg-black cursor-pointer text-[#fff] px-8 py-2 rounded-full text-sm font-bold hover:bg-gray-800">
                    Add
                </button>
            </div>
            {comments.length === 0 ? (
                <p className="text-gray-400 italic">There are no reviews yet. Be the first!</p>
            ) : (
                <div className="flex flex-wrap mx-3"></div>)}
        </div>
    )
}

export default DetailComment