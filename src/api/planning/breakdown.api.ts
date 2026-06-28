import api from "../axios";
import type { ProjectDto } from "../project/project.api";

export interface GenerateBreakdownRequest {
  projectId: number;
  title: string;
  description: string;
  additionalContext?: string;
}

export interface BreakdownResponse {
  breakdown: string;
}

export const BreakdownStatus = {
  DRAFT: "DRAFT",
  GENERATED: "GENERATED",
  SYNCED: "SYNCED",
  OUT_OF_SYNC: "OUT_OF_SYNC",
} as const;

export type BreakdownStatus =
  (typeof BreakdownStatus)[keyof typeof BreakdownStatus];

export interface BreakdownSummary {
  totalBreakdown: number;
  drafts: number;
  generated: number;
  jiraSynced: number;
  outOfSync: number;
}

export interface BreakdownItem {
  breakdownId: number;
  projectName: string;
  title: string;
  description: string;
  additionalContext: string;
  breakdownStatus: BreakdownStatus;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface Breakdown {
  summary: BreakdownSummary;
  table: PaginatedResponse<BreakdownItem>;
}

export type StorySource = "AI" | "MANUAL";

export interface EpicDto {
  id: number;
  title: string;
  description: string;
  storySource: StorySource;

  createdAt: string;
  updatedAt: string;
}

export interface BreakdownDetailResponse {
  id: number;
  title: string;
  description: string;
  additionalContext: string;
  status: BreakdownStatus;
  project: ProjectDto;
  breakdownUrl:string;
  epicsCount: number;
  totalStoryPoints: number;
  storiesCount: number;
  technicalTasksCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// const sleep = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

export const generateBreakdown = async (
  payload: GenerateBreakdownRequest,
): Promise<BreakdownResponse> => {
  const { data } = await api.post<BreakdownResponse>(
    "/api/planning/breakdown",
    payload,
  );

  return data;
};

export const getBreakdowns = async (): Promise<Breakdown> => {
  const { data } = await api.get<Breakdown>("/api/planning/breakdown");
  return data;
};

export const getBreakdownDetails = async (
  breakdownId: number,
): Promise<BreakdownDetailResponse> => {
  const { data } = await api.get<BreakdownDetailResponse>(
    `/api/planning/breakdown/${breakdownId}`,
  );
  return data;
};

export const publishBreakdown = async (
  breakdownId: number,
): Promise<any> => {
  const { data } = await api.post<any>(
    `/api/planning/breakdown/${breakdownId}/push`,
  );
  return data;
};
