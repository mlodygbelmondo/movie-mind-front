import useSWR, { SWRResponse } from "swr";
import { getFetcher } from "../utils/fetcher";

interface UseQueryProps<P> {
  endpoint: (params: P) => string;
  params: P;
  accessToken?: string;
}

export const useQuery = <T, P>({
  endpoint,
  params,
  accessToken,
}: UseQueryProps<P>): SWRResponse<T, Error> => {
  const url = endpoint(params);
  return useSWR<T, Error>(url, getFetcher(accessToken));
};
