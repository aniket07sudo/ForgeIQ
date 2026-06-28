import { Suspense } from "react";
import BreakdownPage from "./Breakdown";
import { Skeleton } from "../../../components/Skeleton/Skeleton";

export const Breakdown = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <BreakdownPage />
    </Suspense>
  );
};
