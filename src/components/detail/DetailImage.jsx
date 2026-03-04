import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

function DetailImage({ images }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1)
  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1)

  if (!images.length) return <div className="bg-gray-100 h-96 w-full rounded-lg" />

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="hidden md:flex flex-col gap-3 order-first">
        {images.map((img, i) => (
          <div key={i} onClick={() => setCurrent(i)}
            className={`w-20 h-20 border-2 cursor-pointer rounded overflow-hidden transition ${current === i ? 'border-black' : 'border-gray-200 opacity-60'}`}>
            <img src={img.url} className="w-full h-full object-cover" alt={`thumb-${i}`} />
          </div>
        ))}
      </div>
      <div className="relative flex-1 rounded-xl overflow-hidden flex items-center justify-center min-h-[400px]">
        <img src={images[current]?.url} alt="product"
          className="max-w-full max-h-[600px] object-contain transition-opacity duration-300" />
        <button onClick={prev} className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-[#fff] p-3 rounded-full shadow-md md:hidden">
          <FaChevronLeft />
        </button>
        <button onClick={next} className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 bg-[#fff] p-3 rounded-full shadow-md md:hidden">
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default DetailImage