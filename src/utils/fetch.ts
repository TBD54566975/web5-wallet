export const fetchTyped = async <R>(
  uri: string,
  config?: Parameters<typeof fetch>[1]
) => {
  try {
    const response = await fetch(uri, config);

    if (!response.ok) {
      throw new Error(`${response.status}:${response.statusText}`);
    }

    const data: R = await response.json();

    return data;
  } catch (e: any) {
    console.warn(e.message);
  }
};
