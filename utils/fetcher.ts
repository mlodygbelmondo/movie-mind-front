export const getFetcher =
  (accessToken?: string) =>
  async <T>(url: string): Promise<T> => {
    if (!accessToken) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("An error occurred while fetching the data.");
      }
      return response.json();
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return response.json();
  };

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};
