import { Suspense } from "react";
import TimeLine from "./ui/time-line";
import Loading from "./ui/loading";

export default function Home() {

  return (
    <div className="flex justify-center h-screen w-full mt-5">
      <Suspense fallback={<Loading />}>
        <TimeLine />
      </Suspense>
    </div>
  )
}