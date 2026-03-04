import img4 from "/img/img4.jpg"
import img5 from "/img/img5.jpg"

function DualBanner() {

    return (
        <section className="px-3 md:px-8 lg:px-12 py-10">
            <div className="flex flex-wrap">
                <div className="md:pr-1 md:w-6/12 mb-4 md:mb-0">
                    <div>
                        <img src={img4} className="w-full" alt="img4" />
                    </div>
                </div>
                <div className="md:pl-1 md:w-6/12">
                    <div className="bg-[#302018] h-full py-[10%] px-[16.5%]">
                        <div className="flex justify-center items-center h-full">
                            <img src={img5} className="w-full object-cover" alt="img5" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DualBanner
