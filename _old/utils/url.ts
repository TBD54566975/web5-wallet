import queryString from "query-string";

function urlWithParams(
  baseURL: string,
  params: Record<string, string>
): string {
  return `${baseURL}?${queryString.stringify(params)}`;
}

export const URLUtils = {
  urlWithParams,
};
