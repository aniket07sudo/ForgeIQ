import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getBreakdowns,
  type Breakdown,
} from "../../../api/planning/breakdown.api";
import { NoBreakdown } from "./NoBreakdown/NoBreakdown";
import { BreakdownDashboard } from "./BreakdownDashboard/BreakdownDashboard";

const BreakdownPage = () => {
  const { data } = useSuspenseQuery<Breakdown>({
    queryKey: ["breakdowns"],
    queryFn: getBreakdowns,
    staleTime: 0,
    gcTime: 0,
  });

  if (data.table.items.length == 0) {
    return <NoBreakdown />;
  }

  return <BreakdownDashboard data={data} />;
};

export default BreakdownPage;
