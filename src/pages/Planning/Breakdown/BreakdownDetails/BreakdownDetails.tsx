import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getBreakdownDetails,
  type BreakdownDetailResponse,
} from "../../../../api/planning/breakdown.api";
import { BreakdownDetailsSkeleton } from "./Skeleton";
import { BreakdownDetailsView } from "./BreakdownDetailsView";
import { useParams } from "react-router-dom";

export const BreakdownDetailsContainer = () => {
  const { breakdownId } = useParams<{ breakdownId: string }>();
  if (!breakdownId) {
    throw new Error("Breakdown id is required");
  }

  const { data, isLoading } = useSuspenseQuery<BreakdownDetailResponse>({
    queryFn: () => getBreakdownDetails(parseInt(breakdownId)),
    queryKey: ["breakdown_details"],
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return <BreakdownDetailsSkeleton />;
  }

  return <BreakdownDetailsView data={data} />;
};
