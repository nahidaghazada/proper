import { useState } from "react"
import { IoSearchSharp } from "react-icons/io5"
import { useNavigate } from "react-router"

function Search({ onClose }) {
    const navigate = useNavigate()
    const [value, setValue] = useState("")

    const handleSearch = () => {
        const request = value.trim().toLowerCase()
        if (!request) return
        navigate(`/shop?searchFilter=${request}`)
        onClose()
        setValue("")
    }

    return (
        <div onClick={onClose} className="fixed hidden md:block bg-[#00000080] top-[60px] left-0 right-0 bottom-0 z-[999]">
            <div onClick={(e) => e.stopPropagation()} className="flex">
                <div className="md:px-8 md:w-9/12 lg:px-12 py-10 bg-[#fff]">
                    <div className="relative">
                        <input type="text" value={value} autoFocus placeholder="Search Products..."
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="block w-full px-3 py-[10px] rounded bg-[#F0F0F0] outline-none" />
                        <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                            <IoSearchSharp />
                        </button>
                    </div>
                </div>
                <div className="md:px-8 md:w-3/12 lg:px-12 py-10 bg-[#E2E2E2]">
                    <p className="font-medium text-[14px] mb-2">Trending</p>
                    <ul className="flex flex-wrap gap-1">
                        {["Shirts", "Suits", "Pants", "Sweaters"].map((item) => (
                            <li key={item}
                                className="text-[#777] text-[13px] underline cursor-pointer"
                                onClick={() => { navigate(`/shop?category=${item.toLowerCase()}`); onClose(); }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Search