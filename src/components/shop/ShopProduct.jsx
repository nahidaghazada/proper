import { useState, useEffect } from "react"
import { useGetCategoriesQuery } from "../../services/categoriesApi"
import { useGetProductsQuery } from "../../services/productsApi"
import { useNavigate, useSearchParams } from "react-router"
import ShopPagination from "./ShopPagination"
import Loading from "../loading/Loading"

function ShopProduct({ showFilter, showFilterMobile, setShowFilterMobile, search }) {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
    const [expandedCategories, setExpandedCategories] = useState({})
    const [selectedSlugs, setSelectedSlugs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 12
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { data: categories } = useGetCategoriesQuery()
    const { data: products, isLoading, isFetching } = useGetProductsQuery({
        limit: limit,
        page: currentPage,
        category: selectedCategoryIds.join(','),
        search: search
    })

    const filtered = products?.products?.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        const categoryParam = searchParams.get('category')
        if (categoryParam && categories) {
            const slugArray = categoryParam.split(',')
            setSelectedSlugs(slugArray)
            const arr = []
            const findArr = (item) => {
                item?.forEach(cat => {
                    if (slugArray.includes(cat.slug)) {
                        arr.push(cat._id)
                    }
                    if (cat.children) {
                        findArr(cat.children)
                    }
                })
            }
            findArr(categories)
            setSelectedCategoryIds(arr)
        } else {
            setSelectedSlugs([])
            setSelectedCategoryIds([])
        }
        setCurrentPage(1)
    }, [searchParams, categories])

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }))
    }

    const handleCategoryClick = (category) => {
        if (category.children && category.children.length > 0) {
            toggleCategory(category._id)
        } else {
            const currentCategory = searchParams.get('category')
            const categoryArray = currentCategory ? currentCategory.split(',') : []
            if (!categoryArray.includes(category.slug)) {
                categoryArray.push(category.slug)
                navigate(`/shop?category=${categoryArray.join(',')}`)
            }
        }
    }

    const clearFilters = () => {
        navigate('/shop')
        setSelectedCategoryIds([])
        setSelectedSlugs([])
        setExpandedCategories({})
        setCurrentPage(1)
    }

    const removeCategory = (slug, index) => {
        const newSlugs = selectedSlugs.slice(0, index)
        if (newSlugs.length > 0) {
            navigate(`/shop?category=${newSlugs.join(',')}`)
        } else {
            navigate('/shop')
        }
    }

    if (isLoading || isFetching) {
        return <Loading />
    }

    const renderCategories = (item, level = 0) => {
        return item?.map((category) => {
            const isSelected = selectedSlugs.includes(category.slug)
            return (
                <li key={category._id} className={level > 0 ? "ml-4" : ""}>
                    <div className="flex items-center gap-1">
                        <button onClick={() => handleCategoryClick(category)}
                            className={`text-sm cursor-pointer hover:underline ${isSelected
                                ? 'text-[#000] font-medium underline'
                                : 'text-gray-600 hover:text-[#000]'
                                }`}>
                            {category.name}
                        </button>
                        {category.children && category.children.length > 0 && (
                            <button onClick={() => toggleCategory(category._id)}
                                className="text-gray-400 hover:text-gray-600">
                                {expandedCategories[category._id]}
                            </button>
                        )}
                    </div>
                    {expandedCategories[category._id] && category.children && (
                        <ul className="mt-1 space-y-1">
                            {renderCategories(category.children, level + 1)}
                        </ul>
                    )}
                </li>
            )
        })
    }

    const renderCategoriesMobile = (item, level = 0) => {
        return item?.map((category) => {
            const isSelected = selectedSlugs.includes(category.slug)
            return (
                <li key={category._id} className={level > 0 ? "ml-4" : ""}>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleCategoryClick(category)}
                            className={`text-base cursor-pointer text-left flex-1 ${isSelected
                                ? 'text-[#000] font-medium underline'
                                : 'text-gray-600 hover:text-[#000]'
                                }`}>
                            {category.name}
                        </button>
                        {category.children && category.children.length > 0 && (
                            <button onClick={() => toggleCategory(category._id)}
                                className="text-gray-400 p-1">
                                {expandedCategories[category._id]}
                            </button>
                        )}
                    </div>
                    {expandedCategories[category._id] && category.children && (
                        <ul className="mt-2 space-y-2">
                            {renderCategoriesMobile(category.children, level + 1)}
                        </ul>
                    )}
                </li>
            )
        })
    }

    return (
        <>
            {showFilterMobile && (
                <div className="md:hidden fixed inset-0 bg-[#fff] z-[1000] overflow-y-auto">
                    <div className="p-6 pb-24">
                        <div className="flex items-center justify-between mb-1">
                            <h2 className="text-xl font-semibold">Filters</h2>
                            <button className="p-2 cursor-pointer" onClick={() => setShowFilterMobile(!showFilterMobile)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <hr className="text-black/30 mb-4" />
                        <div>
                            <h3 className="uppercase font-medium text-[14px] mb-4 tracking-wider">Category</h3>
                            <ul className="space-y-3">
                                {renderCategoriesMobile(categories)}
                            </ul>
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fff] border-t flex gap-3">
                        <button onClick={() => setShowFilterMobile(false)}
                            className="flex-1 cursor-pointer bg-[#000] text-[#fff] py-3 rounded font-medium uppercase text-sm">
                            Apply Filters
                        </button>
                        <button onClick={clearFilters}
                            className="flex-1 cursor-pointer bg-[#fff] border border-[#000] text-[#000] py-3 rounded font-medium uppercase text-sm">
                            Clear Filters
                        </button>
                    </div>
                </div>
            )}
            <section className="flex flex-wrap mb-3">
                {showFilter && (
                    <div className="w-2/12 hidden md:block pr-4">
                        <h3 className="uppercase font-medium text-[14px] mb-4 tracking-widest text-gray-700">
                            category
                        </h3>
                        <ul className="space-y-1">
                            {renderCategories(categories)}
                        </ul>
                    </div>
                )}
                <div className={`w-full ${showFilter ? 'md:w-10/12' : ''}`}>
                    {selectedSlugs.length > 0 && (
                        <div className="mb-4 flex gap-2 flex-wrap">
                            {selectedSlugs.map((slug, index) => (
                                <button key={slug} onClick={() => removeCategory(slug, index)}
                                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border-2 border-[#000] rounded-full text-sm hover:bg-gray-100 transition-colors">
                                    {slug}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-4">
                        {isFetching ? (
                            <Loading />
                        ) : (
                            (search ? filtered : products?.products)?.map((item) => (
                                <div key={item._id} 
                                    onClick={() => navigate(`/detail/${item.slug}/${item.variants?.[0]?.slug}`)}
                                    className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] cursor-pointer rounded p-3 hover:shadow-lg transition-shadow">
                                    <img
                                        src={item.variants?.[0]?.images?.[0]?.url}
                                        alt={item.title}
                                        className="w-full h-[200px] object-cover rounded mb-2"
                                    />
                                    <h3 className="mt-2 text-sm font-medium line-clamp-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm mt-1 font-semibold">
                                        {item.variants?.[0]?.price} $
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                    {(search ? filtered?.length === 0 : products?.products?.length === 0) && (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg mb-4">No items match your current selection</p>
                            <div className="flex gap-3 items-center justify-center">
                                <button onClick={clearFilters} className="underline cursor-pointer text-sm text-gray-600 hover:text-black">
                                    Clear All Filters
                                </button>
                                <span className="text-xs">or</span>
                                <button onClick={() => navigate('/shop')} className="underline cursor-pointer text-sm text-gray-600 hover:text-black">
                                    Shop All Garments
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="w-full mt-8 mb-4">
                        <ShopPagination total={100} page={currentPage} limit={12} totalPages={2} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopProduct