import { createQueryString } from "@/helpers/createQuery"

interface IProps {
  totalPage: number | undefined
  currentPage: number
  setPage: (param: string) => void
}

export default function Pagination({ totalPage, currentPage, setPage }: IProps) {
  if (!totalPage) return null

  const handlePagination = (page: number) => {
    const query = createQueryString('page', `${page}`)
    setPage(query)
  }

  const generatePagination = () => {
    const pages = []
    const maxVisibleButtons = 5

    if (totalPage <= maxVisibleButtons) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPage - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (currentPage < totalPage - 2) {
        pages.push("...")
      }

      pages.push(totalPage)
    }

    return pages
  }

  return (
    <div className="flex gap-2">
      {generatePagination().map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && handlePagination(page)}
          className={`border text-black/60 mt-10 rounded-md px-4 py-2 ${
            currentPage === page ? "bg-blueNavy text-white" : "hover:border-blueNavy hover:text-blueNavy"
          }`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
