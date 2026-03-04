function ShopPagination({ page, totalPages, onPageChange }) {
  const handleChangePage = (newPage) => {
    onPageChange(newPage)
  }

  const handlePlusMinus = (direction) => {
    const newPage = page + direction
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage)
    }
  }

  return (
    <div className="flex justify-center pt-4 border-t border-[#757575] gap-5 items-center w-full">
      <button onClick={() => handlePlusMinus(-1)}
        disabled={page === 1}
        className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4"> <polyline points="15 18 9 12 15 6"></polyline> </svg>
      </button>
      <div className="flex items-center gap-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1}
            onClick={() => handleChangePage(index + 1)}
            className={`text-[18px] text-[#757575] cursor-pointer hover:text-black transition-colors ${index + 1 === page ? '!text-black font-semibold' : ''}`}>
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={() => handlePlusMinus(1)}
        disabled={page === totalPages}
        className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4"> <polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  )
}

export default ShopPagination