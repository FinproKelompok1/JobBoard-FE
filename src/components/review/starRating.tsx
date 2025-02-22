import { FaStar } from "react-icons/fa";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? "text-yellow-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
}
