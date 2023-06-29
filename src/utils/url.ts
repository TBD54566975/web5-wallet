function baseURLWithParams(
  baseURL: string,
  params: { [key: string]: string }
): string {
  let queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${baseURL}?${queryString}`;
}

export const URLUtils = {
  baseURLWithParams,
};
