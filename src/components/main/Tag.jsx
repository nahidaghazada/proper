import { useEffect, useState } from 'react'
import { useGetTagsQuery } from '../../services/tagApi'
import { useGetProductsQuery } from '../../services/productsApi'
import TagCard from '../main/TagCard'

function Tag() {
    const { data: tags } = useGetTagsQuery()
    const { data: productData } = useGetProductsQuery()
    const [checkedTag, setCheckedTag] = useState(null)
    const [variants, setVariants] = useState([])
    const [show, setShow] = useState(10)

    useEffect(() => {
        if (tags && tags.length > 0) {
            setCheckedTag(tags[0]._id)
        }
    }, [tags])

    useEffect(() => {
        if (!productData?.products || !checkedTag)
        return
        const arr = productData.products.filter(product => product.tags?.some(tag => tag._id === checkedTag))

        const set = new Set()
        const add = []

        arr.forEach(item => {
            item.variants.forEach(variant => {
                const key = `${item._id}-${variant.specs.color}`
                if (!set.has(key)) {
                    add.push({ ...variant, product_slug: item.slug, _id: variant._id })
                    set.add(key)
                }
            })
        })
        setVariants(add)
    }, [productData, checkedTag])

    useEffect(() => {
        const resize = () => setShow(window.innerWidth < 768 ? 9 : 10)
        resize()
        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    }, [])

    return (
        <section className='px-3 md:px-8 lg:px-12 py-10'>
            <ul className='flex items-center gap-3 pl-1 pb-2'>
                {tags?.map((item, index) => (
                    <li key={item._id} className='flex items-center gap-3 italic text-[20px] md:text-[32px]'>
                        {index !== 0 && <span className="text-[#666]">/</span>}
                        <button onClick={() => setCheckedTag(item._id)}
                            className={checkedTag === item._id ? "text-black cursor-pointer" : "text-[#999] hover:text-[#555] duration-200 cursor-pointer"}>
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap">
                {variants.slice(0, show).map(item => (
                    <TagCard key={item._id} item={item} />
                ))}
            </div>
        </section>
    )
}

export default Tag
