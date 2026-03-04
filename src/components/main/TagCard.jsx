import { Link } from "react-router"

function TagCard({ item }) {
    return (
        <div className="w-4/12 md:w-[20%] p-1">
            <Link to={`/detail/${item.product_slug}/${item.slug}`}>
                <img className="w-full h-full object-cover"
                    src={typeof item.images[0] === "string" ? item.images[0] : item.images[0].url} alt="image" />
            </Link>
        </div>
    )
}

export default TagCard