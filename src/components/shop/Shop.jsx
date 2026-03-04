import { useSearchParams } from "react-router"
import { useGetCategoriesQuery } from "../../services/categoriesApi"
import { useState, useEffect } from "react"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import Loading from "../loading/Loading"
import ShopProduct from "./ShopProduct"

function Shop() {
  const { data: categories, isLoading } = useGetCategoriesQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilter, setShowFilter] = useState(true)
  const [showFilterMobile, setShowFilterMobile] = useState(false)
  const [search, setSearch] = useState(searchParams.get("search") || "")

  useEffect(() => {
    const searchParam = searchParams.get("search")
    if (searchParam) {
      setSearch(searchParam)
    }
  }, [searchParams])

  const getCategoryName = () => {
    const categoryParam = searchParams.get('category')
    if (!categoryParam || !categories) return null

    const slugs = categoryParam.split(',')
    let categoryName = null

    const findCategory = (items, targetSlug) => {
      for (const item of items) {
        if (item.slug === targetSlug) {
          return item.name
        }
        if (item.children) {
          const found = findCategory(item.children, targetSlug)
          if (found) return found
        }
      }
      return null
    }

    for (let i = slugs.length - 1; i >= 0; i--) {
      categoryName = findCategory(categories, slugs[i])
      if (categoryName) break
    }
    return categoryName
  }

  const selectedCategoryName = getCategoryName()

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    if (value) {
      const currentParams = Object.fromEntries(searchParams)
      setSearchParams({ ...currentParams, search: value })
    } else {
      searchParams.delete("search")
      setSearchParams(searchParams)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {isLoading ? (<Loading />) : (
          <>
            <section className="px-3 md:px-8 lg:px-12 py-4 md:pt-10">
              <div className="flex items-center justify-between gap-4">
                <div className="md:w-9/12">
                  <h1 className="italic capitalize text-[20px] md:text-[32px] lg:text-[38px]">
                    Men's {selectedCategoryName || "Clothing & Accessories"}
                  </h1>
                </div>
                <div className="md:w-3/12 flex justify-end">
                  <button className="md:hidden p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-gray"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 0 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" /></svg>
                  </button>
                  <input type="text" placeholder="Search products..." value={search} onChange={handleSearchChange}
                    className="hidden md:block w-full bg-[#f4f4f4] text-[14px] placeholder:text-gray-600 px-3 py-2 rounded" />
                </div>
              </div>
            </section>
            <section className="relative px-3 md:px-8 lg:px-12 py-4 md:py-10">
              <div className="flex pb-3 border-b sticky bg-[#fff] top-[60px] pt-3 left-0 right-0 z-[900] md:justify-end border-[#00000033]">
                <button onClick={() => { setShowFilter(!showFilter); setShowFilterMobile(!showFilterMobile) }}
                  className="flex items-center gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M21.96 10H25v1h-3.04c-.24 1.42-1.47 2.5-2.96 2.5-1.5 0-2.72-1.08-2.96-2.5H7v-1h9.04c.24-1.42 1.47-2.5 2.96-2.5 1.5 0 2.72 1.08 2.96 2.5zM19 12.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM15.96 20H25v1h-9.04c-.24 1.42-1.47 2.5-2.96 2.5-1.5 0-2.72-1.08-2.96-2.5H7v-1h3.04c.24-1.42 1.47-2.5 2.96-2.5 1.5 0 2.72 1.08 2.96 2.5zM13 22.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fillRule="evenodd"></path></svg>
                  <p>
                    <span className="hidden md:inline">{showFilter ? "Hide" : "Show"}</span>
                    <span className="md:hidden">Show</span>{" "}Filters
                  </p>
                </button>
              </div>
            </section>
            <section className="px-3 md:px-8 lg:px-12">
              <ShopProduct showFilter={showFilter} showFilterMobile={showFilterMobile} setShowFilterMobile={setShowFilterMobile} search={search} />
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default Shop