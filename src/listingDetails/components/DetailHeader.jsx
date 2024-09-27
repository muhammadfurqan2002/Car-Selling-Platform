import { HiCalendarDays } from "react-icons/hi2";
function DetailHeader({ carDetail }) {
  return (
    <div>
      {carDetail?.listingTitle ? (
        <div>
          <h2 className="text-3xl font-bold">{carDetail?.listingTitle}</h2>
          <p className="text-sm">{carDetail?.tagLine}</p>

          <div className="flex gap-2 mt-3">
            <div className="flex gap-2 items-center p-1 px-3 bg-blue-50 rounded-full">
              <HiCalendarDays className="w-7 h-7" />
              <h2>{carDetail?.year}</h2>
            </div>
            <div className="flex gap-2 items-center p-1 px-3 bg-blue-50 rounded-full">
              <HiCalendarDays className="w-7 h-7" />
              <h2>200 miles</h2>
            </div>
            <div className="flex gap-2 items-center p-1 px-3 bg-blue-50 rounded-full">
              <HiCalendarDays className="w-7 h-7" />
              <h2>{carDetail?.transmission}</h2>
            </div>
            <div className="flex gap-2 items-center p-1 px-3 bg-blue-50 rounded-full">
              <HiCalendarDays className="w-7 h-7" />
              <h2>{carDetail?.fuelType}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl h-[100px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
}

export default DetailHeader;
