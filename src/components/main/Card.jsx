import { Link } from "react-router"

function Card() {

  const data = [
    {
      img: "img/img2.jpg",
      title: "Dress Shirts",
      path: "/shop?category=shirts,dress-shirts"
    },

    {
      img: "img/img3.jpg",
      title: "Men's Suits",
      path: "/shop?category=suits"
    }
  ]

  return (
    <section className="px-3 py-10 md:px-3 lg:px-12">
      <div className="flex flex-wrap justify-between gap-6 md:gap-0">
        {data.map((item, index) => (
          <Link to={item.path} key={index} className="relative w-full cursor-pointer md:w-[49%] block group">
            <div className="relative w-full h-full">
              <img src={item.img} alt={item.title} />
              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.3)]"></div>
            </div>
            <div className="absolute text-[#fff] left-8 bottom-12 z-20">
              <span className="text-[15px] block mb-1">Explore</span>
              <h2 className="text-[28px] md:text-[32px] font-serif group-hover:underline">{item.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Card
