import StarRating from "@/components/review/starRating";
import { CurrencyFormatter } from "@/helpers/currencryFormatter";
import { getCompanyReviews } from "@/libs/review";
import { IReview } from "@/types/types";
import { FaStar } from "react-icons/fa";

export default async function CompanyReview({
  params,
}: {
  params: { adminId: number };
}) {
  const {
    companyReviews,
    companyName,
  }: { companyReviews: IReview[]; companyName: string } =
    await getCompanyReviews(params.adminId);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center p-5">
        <h1 className="w-full text-center text-3xl font-bold text-primary">
          Company Reviews
        </h1>
        <h2 className="mt-3 text-3xl font-semibold text-accent">
          {companyName}
        </h2>
        <div className="mt-5 flex flex-col gap-5">
          {companyReviews.map((data, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-lg md:w-[450px]"
              >
                <p>
                  Review from a{" "}
                  <span className="font-bold text-accent">{data.jobTitle}</span>{" "}
                  at this company:
                </p>
                <p className="text-xl font-medium">"{data.review}"</p>
                <div className="space-y-1">
                  <div className="flex justify-between border-b">
                    <p className="font-medium">Culture rating</p>
                    <StarRating rating={data.CultureRating} />
                  </div>
                  <div className="flex justify-between border-b">
                    <p className="font-medium">Work-life balance rating</p>
                    <StarRating rating={data.balanceRating} />
                  </div>
                  <div className="flex justify-between border-b">
                    <p className="font-medium">Career rating</p>
                    <StarRating rating={data.careerRating} />
                  </div>
                  <div className="flex justify-between border-b">
                    <p className="font-medium">Facility rating</p>
                    <StarRating rating={data.facilityRating} />{" "}
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Estimated salary</p>
                  <p className="font-semibold">
                    {CurrencyFormatter(data.salary)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
