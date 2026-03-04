import { useParams } from "react-router"
import { useGetProductBySlugQuery, useGetProductsQuery } from "../../services/productsApi"
import DetailImage from "./DetailImage"
import DetailProduct from "./DetailProduct"
import DetailComment from "./DetailComment"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import Loading from "../loading/Loading"

function Detail() {
  const { productSlug, slug } = useParams()
  // const { data, isLoading, isFetching } = useGetProductsQuery({ limit: 100, page: 1 })
  const { data: detailProduct , isLoading , isFetching } = useGetProductBySlugQuery(productSlug)
  console.log(detailProduct);

  if (isLoading || isFetching || !detailProduct) {
    return <Loading />
  }

  const product = detailProduct
  const variant = detailProduct?.variants?.find((v) => v.slug === slug)

  if (!product || !variant) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
          Məhsul tapılmadı.
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="px-3 md:px-8 lg:px-12 py-10">
          <div className="flex flex-wrap md:justify-between gap-10">
            <div className="w-full md:w-6/12">
              <DetailImage images={variant.images || []} />
            </div>
            <div className="w-full md:w-5/12">
              <DetailProduct product={product} variant={variant} />
            </div>
            <div className="w-full pt-12 border-t border-gray-100 mt-10">
              <DetailComment productId={product._id} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Detail