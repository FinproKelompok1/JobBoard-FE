interface IProps {
  setTempMinAge: (param: string) => void;
  setTempMaxAge: (param: string) => void;
  applyAge: () => void;
  tempMinAge: string;
  tempMaxAge: string;
}

export default function AgeRange({
  setTempMinAge,
  setTempMaxAge,
  applyAge,
  tempMinAge,
  tempMaxAge,
}: IProps) {
  return (
    <>
      <input
        type="number"
        min={0}
        max={100}
        name="min_age"
        placeholder="Min Age"
        value={tempMinAge}
        onChange={(e) => setTempMinAge(e.target.value)}
        className="w-full tablet:w-auto flex-1 px-3 py-2 border text-xs border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-500">to</span>
      <input
        type="number"
        min={0}
        max={100}
        name="max_age"
        placeholder="Max Age"
        value={tempMaxAge}
        onChange={(e) => setTempMaxAge(e.target.value)}
        className="w-full tablet:w-auto flex-1 px-3 py-2 border text-xs border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={applyAge}
        className="px-4 py-2 text-xs bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
      >
        APPLY
      </button>
    </>
  );
}
