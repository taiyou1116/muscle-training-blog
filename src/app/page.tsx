import { Suspense } from "react";
import TimeLine from "./ui/time-line";
import Loading from "./ui/loading";

export default function Home() {

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <TimeLine />
      </Suspense>
    </div>
  )
}