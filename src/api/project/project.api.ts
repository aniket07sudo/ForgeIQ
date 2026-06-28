import api from "../axios";

export interface ProjectDto {
  id: number;
  name: string;
  description: string;
  storiesCount: string;
  storiesPoint: number;
  status: ProjectStatus;
  jiraConnection: JiraConnectionDto | null;
  jiraConnections: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateDto {
  id: string;
}

export interface JiraProjectResponseDto {
  id: String;
  key: String;
  name: String;
}

// export interface ProjectDto {
//   id: number;
//   name: string;
//   description: string;
//   storiesCount: number;
//   storiesPoints: number;
//   status: ProjectStatus;
//   jiraConnections: JiraConnectionDto[] | null;
//   createdAt: string;
//   updatedAt: string;
// }

export interface JiraConnectionDto {
  id: number;
  name: string;
  baseUrl: string;
  jiraProjectKey: string | null;
  jiraProjectName: string | null;
}

// export type ProjectStatus =
//   | "CONNECT_JIRA"
//   | "SELECT_JIRA_PROJECT"
//   | "READY";

export interface JiraProjectsResponse {
  values: JiraProjectResponseDto[];
}

interface SelectJiraProjectRequest {
  projectId: String;
  projectKey: String;
  projectName: String;
}

export interface GenerateProjectRequest {
  name: string;
  description: string;
}

export interface ConnectJiraRequest {
  name: string;
  baseUrl: string;
  email: string;
  apiToken: string;
}

export interface ProjectStatusResponse {
  jiraSite: string;
  jiraProjectName: string;
  jiraProjectKey: string;
  jiraAccount: string;
  status: ProjectStatus;
}

export const ProjectStatus = {
  SELECT_JIRA_PROJECT: "SELECT_JIRA_PROJECT",
  CONNECT_JIRA: "CONNECT_JIRA",
  READY: "READY",
} as const;

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const getProjects = async (): Promise<ProjectDto[]> => {
  const { data } = await api.get<ProjectDto[]>("/api/project");
  return data;
};

export const createProjects = async (
  payload: GenerateProjectRequest,
): Promise<number> => {
  const { data } = await api.post<number>("/api/project", payload);
  return data;
};

export const connectJira = async (
  projectId: string,
  payload: ConnectJiraRequest,
): Promise<void> => {
  const { data } = await api.post<void>(
    `/api/project/${projectId}/jira/connect`,
    payload,
  );
  return data;
};

export const getJiraProjects = async (
  projectId: string,
): Promise<JiraProjectResponseDto[]> => {
  const { data } = await api.get<JiraProjectsResponse>(
    `/api/project/${projectId}/jira/getProjects`,
  );
  return data.values;
};

export const selectJiraProject = async (
  projectId: number,
  payload: SelectJiraProjectRequest,
): Promise<void> => {
  const { data } = await api.post<void>(
    `/api/project/${projectId}/jira/selectProject`,
    payload,
  );
  return data;
};

export const getProjectStatus = async (
  projectId: string,
): Promise<ProjectStatusResponse> => {
  const { data } = await api.get<ProjectStatusResponse>(
    `/api/project/${projectId}/jira/getProjectStatus`,
  );
  return data;
};
