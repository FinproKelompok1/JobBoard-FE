interface IProps {
  setTempMinAge: (param: string) => void
  setTempMaxAge: (param: string) => void
  applyAge: () => void
  tempMinAge: string
  tempMaxAge: string
}

export default function AgeRange({
  setTempMinAge,
  setTempMaxAge,
  applyAge,
  tempMinAge,
  tempMaxAge
}: IProps) {
  return (
    <>
      <input
        type="number"
        min={0}
        max={100}
        name="min_age"
        placeholder="Age"
        value={tempMinAge}
        onChange={(e) => setTempMinAge(e.target.value)}
        className="outline-none px-2 py-1 border w-16"
      />
      <span>between</span>
      <input
        type="number"
        min={0}
        max={100}
        name="max_age"
        placeholder="Age"
        value={tempMaxAge}
        onChange={(e) => setTempMaxAge(e.target.value)}
        className="outline-none px-2 py-1 border w-16"
      />
      <button
        onClick={applyAge}
        className="px-2 py-1 text-xs bg-pink text-white font-semibold"
      >
        APPLY
      </button>
    </>
  )
}