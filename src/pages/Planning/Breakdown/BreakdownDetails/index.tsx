import { Suspense } from "react";
import { BreakdownDetailsSkeleton } from "./Skeleton";
import { BreakdownDetailsContainer } from "./BreakdownDetails";

export const BreakdownDetails = () => {
  return (
    <Suspense fallback={<BreakdownDetailsSkeleton />}>
      <BreakdownDetailsContainer />
    </Suspense>
  );
};
