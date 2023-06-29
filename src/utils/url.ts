import queryString from "query-string";

function urlWithParams(
  baseURL: string,
  params: { [key: string]: string }
): string {
  return `${baseURL}?${queryString.stringify(params)}`;
}

export const URLUtils = {
  urlWithParams,
};
