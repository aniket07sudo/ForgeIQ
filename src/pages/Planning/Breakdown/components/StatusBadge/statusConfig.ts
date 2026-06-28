import type { BreakdownStatus } from "../../../../../api/planning/breakdown.api";
import type { SVGIcons } from "../../../../../components/Icon/SvgIcon";

export const STATUS_CONFIG: Record<
  BreakdownStatus,
  {
    label: string;
    icon: SVGIcons;
    iconColor: string;
    textColor: string;
    backgroundColor: string;
  }
> = {
  DRAFT: {
    label: "DRAFT",
    icon: "draft",
    iconColor: "#4094FF",
    textColor: "#4094FF",
    backgroundColor: "rgba(64,148,255,0.12)",
  },
  GENERATED: {
    label: "GENERATED",
    icon: "ai",
    iconColor: "#F6A623",
    textColor: "#F6A623",
    backgroundColor: "rgba(246,166,35,0.12)",
  },
  SYNCED: {
    label: "SYNCED",
    icon: "tick",
    iconColor: "#5EE66A",
    textColor: "#5EE66A",
    backgroundColor: "rgba(94,230,106,0.12)",
  },
  OUT_OF_SYNC: {
    label: "PARTIALLY SYNCED",
    icon: "sync",
    iconColor: "#FF5A3D",
    textColor: "#FF5A3D",
    backgroundColor: "rgba(255,90,61,0.12)",
  },
} as const;
