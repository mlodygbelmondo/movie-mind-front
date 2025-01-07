import useSWRMutation from "swr/mutation";
const POST = async <T>(url: string, { arg }: { arg: T }) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.clone().json());
};

const DELETE = async <T>(url: string, { arg }: { arg: T }) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.clone().json());
};

interface UseMutationProps<P> {
  endpoint: (params: P) => {
    url: string;
    method: string;
  };
  params: P;
}

export const useMutation = <T, P>({
  endpoint,
  params,
}: UseMutationProps<P>) => {
  const { url, method } = endpoint(params);
  const sendRequest = method === "POST" ? POST : DELETE;

  return useSWRMutation(url, sendRequest);
};
