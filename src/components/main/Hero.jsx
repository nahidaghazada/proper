import desktopImg from "/img/img1.jpg"
import mobileImg from "/img/img1.2.jpg"
import { useEffect, useState } from "react"
import { Link } from "react-router"

function Hero() {
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        const handleSize = () => {
            setMobile(window.innerWidth < 850)
        }
        handleSize()
        window.addEventListener("resize", handleSize)
        return () => window.removeEventListener("resize", handleSize)
    }, [])

    return (
        <section className="relative min-h-[70vh] max-h-[87.5vh] m-0 p-0 overflow-hidden">
            <img src={mobile ? mobileImg : desktopImg} alt="hero" className="w-full h-full object-cover"
                style={{ objectPosition: "50% 33%", minHeight: "70vh", maxHeight: "87.5vh" }} />
                <div className="absolute z-[900] left-3 bottom-6 md:bottom-10 lg:bottom-20 md:left-8 lg:left-12">
                    <h2 className="text-[#fff] capitalize text-[30px] md:text-[36px] font-serif mb-4 tracking-wider font-normal">fresh fits</h2>
                    <Link to="/shop" className="uppercase bg-[#fff] text-[#000] tracking-wider py-[10px] px-5 rounded-[3px] text-[14px] font-medium">shop new arrivals</Link>
                </div>
        </section>
    )
}

export default Hero
