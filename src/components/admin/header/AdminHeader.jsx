import { Link, useLocation } from "react-router"

function AdminHeader() {
  const { pathname } = useLocation()

  const links = [
    { to: "/admin/products", item: "Products" },
    { to: "/admin/category", item: "Category" },
    { to: "/admin/tag", item: "Tag" },
  ]

  return (
    <div className="bg-[#111827] border-b border-gray-600">
      <ul className="flex items-center justify-center gap-10 py-5">
        {links.map(({ to, item }) => (
          <li key={to}>
            <Link to={to}
              className={pathname === to ? "text-[#fff] font-medium" : "text-gray-500 hover:text-gray-300"}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminHeader