import { useState } from "react"
import { useGetCategoriesQuery } from "../../../services/categoriesApi"
import { useAddProductMutation } from "../../../services/productsApi"
import { useGetTagsQuery } from "../../../services/tagApi"
import toast from "react-hot-toast"

function AddProductForm({ onClose }) {
    const { data: tagsData } = useGetTagsQuery()
    const { data: categoriesData } = useGetCategoriesQuery()
    const [addProduct] = useAddProductMutation()

    const tags = tagsData || []
    const categories = categoriesData || []

    const [form, setForm] = useState({
        title: "", categories: "", tags: "", description: "", details: [], specs: [],
    })
    const [detail, setDetail] = useState("")
    const [specKey, setSpecKey] = useState("")
    const [specValue, setSpecValue] = useState({})

    const handleAddDetail = () => {
        if (!detail.trim()) return
        setForm((item) => ({ ...item, details: [...item.details, detail.trim()] }))
        setDetail("")
    }

    const addSpecKey = () => {
        if (!specKey.trim()) return
        const key = specKey.trim().toLowerCase()
        if (form.specs.find((index) => index.key === key)) return
        setForm((item) => ({ ...item, specs: [...item.specs, { key, name: specKey.trim(), values: [] }] }))
        setSpecKey("")
    }

    const updateSpecValue = (specKey, field, val) => {
        setSpecValue((item) => ({ ...item, [specKey]: { ...item[specKey], [field]: val } }))
    }

    const addSpecValue = (specKey) => {
        const input = specValue[specKey] || {}
        if (!input.key?.trim()) return
        setForm((item) => ({
            ...item,
            specs: item.specs.map((index) =>
                index.key === specKey
                    ? { ...index, values: [...index.values, { key: input.key.trim(), value: input.value?.trim() || input.key.trim() }] }
                    : index
            ),
        }))
        setSpecValue((item) => ({ ...item, [specKey]: { key: "", value: "" } }))
    }

    const getAllCategories = (cats, depth = 0) => {
        let result = []
        for (const cat of cats || []) {
            result.push({ _id: cat._id, name: "\u2014".repeat(depth) + (depth > 0 ? " " : "") + cat.name })
            if (cat.children?.length) result = result.concat(getAllCategories(cat.children, depth + 1))
        }
        return result
    }
    const flatCategories = getAllCategories(categories)

    const handleSubmit = async () => {
        if (!form.title.trim()) return toast.error("Title daxil edin")
        if (!form.categories) return toast.error("Category secin")
        if (!form.description.trim()) return toast.error("Description daxil edin")
        try {
            await addProduct({
                title: form.title,
                categories: [form.categories],
                tags: form.tags ? [form.tags] : [],
                description: form.description,
                details: form.details,
                specs: form.specs,
            }).unwrap()
            toast.success("Product added!")
            onClose()
        } catch (err) {
            toast.error(err?.data?.message || "Addition error")
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div>
                <label className="text-[#fff] text-sm mb-1 block">Product title <span className="text-red-400">*</span></label>
                <input type="text" placeholder="Product title" value={form.title}
                    onChange={(e) => setForm((item) => ({ ...item, title: e.target.value }))}
                    className="w-full bg-[#2a3147] text-[#fff] rounded px-3 py-2.5 outline-none border border-transparent focus:border-blue-500 placeholder-gray-500" />
            </div>
            <div>
                <label className="text-[#fff] text-sm mb-1 block">Product categories <span className="text-red-400">*</span></label>
                <select value={form.categories} onChange={(e) => setForm((item) => ({ ...item, categories: e.target.value }))}
                    className="w-full bg-[#2a3147] text-[#fff] rounded px-3 py-2.5 outline-none border border-transparent focus:border-blue-500">
                    <option value="">Choose a category</option>
                    {flatCategories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
            </div>
            <div>
                <label className="text-[#fff] text-sm mb-1 block">Product tags</label>
                <select value={form.tags} onChange={(e) => setForm((item) => ({ ...item, tags: e.target.value }))}
                    className="w-full bg-[#2a3147] text-[#fff] rounded px-3 py-2.5 outline-none border border-transparent focus:border-blue-500">
                    <option value="">Choose a tag</option>
                    {tags.map((tag) => <option key={tag._id} value={tag._id}>{tag.name}</option>)}
                </select>
            </div>
            <div>
                <label className="text-[#fff] text-sm mb-1 block">Product detail</label>
                <div className="flex gap-2">
                    <input type="text" placeholder="Product detail" value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddDetail()}
                        className="flex-1 bg-[#2a3147] text-[#fff] rounded px-3 py-2.5 outline-none border border-transparent focus:border-blue-500 placeholder-gray-500" />
                    <button onClick={handleAddDetail} className="bg-[#2a3147] hover:bg-[#3a4157] text-[#fff] px-4 py-2 rounded transition border border-gray-600">Add</button>
                </div>
                {form.details.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {form.details.map((d, i) => (
                            <span key={i} className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded flex items-center gap-1">
                                {d}
                                <button onClick={() => setForm((item) => ({ ...item, details: item.details.filter((_, idx) => idx !== i) }))} className="text-red-400 hover:text-red-300 ml-1">x</button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <label className="text-[#fff] text-sm mb-1 block">Product description <span className="text-red-400">*</span></label>
                <textarea placeholder="Product description" value={form.description}
                    onChange={(e) => setForm((item) => ({ ...item, description: e.target.value }))}
                    rows={4} className="w-full bg-[#2a3147] text-[#fff] rounded px-3 py-2.5 outline-none border border-transparent focus:border-blue-500 placeholder-gray-500 resize-y" />
            </div>
            <div>
                <label className="text-[#fff] text-sm mb-1 block">Product spec key <span className="text-red-400">*</span></label>
                <div className="flex gap-2">
                    <input type="text" placeholder="Product specKey" value={specKey}
                        onChange={(e) => setSpecKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSpecKey()}
                        className="flex-1 bg-[#2a3147] text-[#fff] rounded px-3 py-2.5 outline-none border border-transparent focus:border-blue-500 placeholder-gray-500" />
                    <button onClick={addSpecKey} className="bg-[#2a3147] hover:bg-[#3a4157] text-[#fff] px-4 py-2 rounded transition border border-gray-600">Add</button>
                </div>
            </div>
            {form.specs.map((spec) => (
                <div key={spec.key} className="border border-[#2a3147] rounded item-4">
                    <item className="text-[#fff] font-medium mb-3 capitalize">{spec.name} <span className="text-gray-400 text-xs">({spec.values.length} value)</span></item>
                    {spec.values.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {spec.values.map((v, i) => (
                                <span key={i} className="bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded flex items-center gap-1">
                                    {v.key}: {v.value.startsWith("blob") || v.value.startsWith("http") ? "image" : v.value}
                                    <button onClick={() => setForm((item) => ({ ...item, specs: item.specs.map((index) => index.key === spec.key ? { ...index, values: index.values.filter((_, idx) => idx !== i) } : index) }))} className="text-red-400 hover:text-red-300 ml-1">x</button>
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[#fff] text-xs mb-1 block">Product key <span className="text-red-400">*</span></label>
                            <input type="text" placeholder="Product value" value={specValue[spec.key]?.key || ""}
                                onChange={(e) => updateSpecValue(spec.key, "key", e.target.value)}
                                className="w-full bg-[#2a3147] text-[#fff] rounded px-3 py-2 outline-none border border-transparent focus:border-blue-500 placeholder-gray-500 text-sm" />
                        </div>
                        <div>
                            <label className="text-[#fff] text-xs mb-1 block">Product value <span className="text-red-400">*</span></label>
                            <label className="w-full bg-blue-700 hover:bg-blue-800 text-[#fff] rounded px-3 py-2 flex items-center justify-center cursor-pointer transition text-sm">
                                Upload
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files[0]; if (!file) return; updateSpecValue(spec.key, "value", URL.createObjectURL(file)) }} />
                            </label>
                            {specValue[spec.key]?.value && <item className="text-green-400 text-xs mt-1">Sekil secildi</item>}
                        </div>
                    </div>
                    <button onClick={() => addSpecValue(spec.key)} className="mt-3 w-full bg-[#2a3147] hover:bg-[#3a4157] text-[#fff] py-2 rounded transition border border-gray-600 text-sm">Add Spec</button>
                </div>
            ))}
            <button onClick={handleSubmit}
                className="cursor-pointer w-full bg-[#2a3147] hover:bg-[#3a4157] disabled:opacity-50 text-[#fff] py-3 rounded transition font-semibold text-sm border border-gray-600">
                Add Product
            </button>
        </div>
    )
}

export default AddProductForm