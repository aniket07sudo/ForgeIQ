import api from "../axios";

export interface GenerateBreakdownRequest {
  projectId:number;
  title: string;
  description: string;
  additionalContext?: string;
}

export interface BreakdownResponse {
  breakdown: string;
}

export const saveBreakdownDraft = async (
  payload: GenerateBreakdownRequest,
): Promise<BreakdownResponse> => {
  const { data } = await api.post<BreakdownResponse>(
    "/api/planning/breakdown/draft",
    payload,
  );

  return data;
};