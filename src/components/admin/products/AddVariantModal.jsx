import { useAddVariantMutation } from "../../../services/productsApi"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import toast from "react-hot-toast"

function AddVariantModal({ isOpen, onClose, product }) {
    const [addVariant] = useAddVariantMutation()
    const specs = product?.specs || []
    const getSpecs = () => specs.reduce((item, index) => { item[index.key] = ""; return item }, {})
    const [form, setForm] = useState({ price: 0, discountType: "percentage", discount: 0, stock: 0, specs: {}, images: [] })

    useEffect(() => {
        setForm({ price: 0, discountType: "percentage", discount: 0, stock: 0, specs: getSpecs(), images: [] })
    }, [product])

    const handleSubmit = async () => {
        if (specs.some((index) => !form.specs[index.key])) return toast.error("Select all specs")
        try {
            await addVariant({
                productId: product._id,
                variantData: { price: Number(form.price), discountType: form.discountType, discount: Number(form.discount), stock: Number(form.stock), specs: form.specs }
            }).unwrap()
            toast.success("Variant added!")
            onClose()
        } catch (error) {
            toast.error(err?.data?.message || "Variant addition error")
        }
    }

    if (!isOpen) return null
    return (
        <div className="fixed flex justify-center items-center inset-0 z-[999] bg-black/60">
            <div className="bg-[#1e2433] max-w-2xl w-full rounded-md py-5 px-6 max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-5">
                    <h2 className="text-[#fff] text-xl font-semibold">Add Variant</h2>
                    <button onClick={onClose}><IoCloseOutline size={26} className="text-[#fff] cursor-pointer" /></button>
                </div>
                <p className="text-gray-400 text-sm mb-4">Product: <span className="text-[#fff] font-medium">{product?.title}</span></p>
                <div className="grid grid-cols-4 gap-4 mb-5">
                    {[["price", "Price *"], ["discount", "Discount"], ["stock", "Stock"]].map(([key, label]) => (
                        <div key={key}>
                            <label className="text-[#fff] text-sm mb-1 block">{label}</label>
                            <input type="number" value={form[key]}
                                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                                className="w-full bg-[#2a3147] text-[#fff] rounded px-3 py-2 outline-none border border-transparent focus:border-blue-500" />
                        </div>
                    ))}
                    <div>
                        <label className="text-[#fff] text-sm mb-1 block">Discount Type</label>
                        <select value={form.discountType} onChange={(e) => setForm((p) => ({ ...p, discountType: e.target.value }))}
                            className="w-full bg-[#2a3147] text-[#fff] rounded px-3 py-2 outline-none border border-transparent focus:border-blue-500">
                            <option value="percentage">Percentage</option>
                            <option value="value">Value</option>
                        </select>
                    </div>
                </div>
                {specs.map((spec) => (
                    <div key={spec.key} className="mb-4">
                        <label className="text-[#fff] text-sm mb-2 block">
                            {spec.name} <span className="text-red-400">*</span> :
                            {form.specs[spec.key] && <span className="ml-2 text-blue-400 uppercase">{form.specs[spec.key]}</span>}
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {spec.values.map((val) => (
                                <label key={val.key} className="flex items-center gap-1.5 text-[#fff] text-sm cursor-pointer">
                                    <input type="radio" name={`${product?._id}-${spec.key}`} value={val.key}
                                        checked={form.specs[spec.key] === val.key}
                                        onChange={() => setForm((p) => ({ ...p, specs: { ...p.specs, [spec.key]: val.key } }))}
                                        className="accent-blue-500" />
                                    {val.value.startsWith("http") ? val.key : val.value}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="mb-5">
                    <label className="text-[#fff] text-sm mb-2 block">Image</label>
                    <label className="w-full h-40 bg-[#2a3147] rounded flex flex-col justify-center items-center cursor-pointer border-2 border-dashed border-gray-500 hover:border-blue-400 transition">
                        {form.images.length > 0 ? (
                            <div className="flex flex-wrap gap-2 p-2">
                                {form.images.map((img, i) => <img key={i} src={URL.createObjectURL(img)} alt="img" className="h-16 w-16 object-cover rounded" />)}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                <span className="text-sm">Select image</span>
                            </div>
                        )}
                        <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => setForm((p) => ({ ...p, images: Array.from(e.target.files) }))} />
                    </label>
                </div>
                <button onClick={handleSubmit}
                    className="cursor-pointer bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-[#fff] px-6 py-2 rounded transition">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AddVariantModal