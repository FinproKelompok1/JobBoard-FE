import { createQueryString } from "@/helpers/createQuery"

interface IProps {
  totalPage: number | undefined
  setPage: (param: string) => void
}

export default function Pagination({ totalPage, setPage }: IProps) {
  const handlePagination = (page: number) => {
    const query = createQueryString('page', `${page}`)
    setPage(query)
  }
  return (
    <div className="flex gap-2">
      {totalPage && Array.from({ length: totalPage }, (_, idx) => {
        return (
          <button onClick={() => handlePagination(idx + 1)} key={idx} className="border text-black/60 mt-10 rounded-md px-4 py-2 hover:border-orange-400 hover:text-orange-400">{idx + 1}</button>
        )
      })}
    </div>
  )
}