function DetailSize({ size, currentSize, variants, onSelect }) {
  const stock = variants.some((v) => v.specs.size === size.key)

  return (
    <button type="button" disabled={!stock}
      onClick={() => onSelect(size.key)}
      className={`min-w-[50px] h-[50px] border-2 flex items-center justify-center rounded-lg uppercase text-sm font-bold transition-all
        ${!stock 
          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
          : 'border-gray-300 cursor-pointer hover:border-black'}
        ${currentSize === size.key ? 'bg-black text-[#fff] border-black shadow-lg' : 'bg-[#fff] text-black'}`}>
      {size.value}
    </button>
  )
}

export default DetailSize