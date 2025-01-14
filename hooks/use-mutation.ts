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

const getFetcher = ({
  accessToken,
  method,
}: {
  accessToken?: string;
  method: string;
}) => {
  if (accessToken) {
    return async <T>(url: string, { arg }: { arg: T }) => {
      return fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      }).then((res) => res.clone().json());
    };
  }

  return async <T>(url: string, { arg }: { arg: T }) => {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    }).then((res) => res.clone().json());
  };
};

interface UseMutationProps<P> {
  endpoint: (params: P) => {
    url: string;
    method: string;
  };
  params: P;
  accessToken?: string;
}

export const useMutation = <P>({
  endpoint,
  params,
  accessToken,
}: UseMutationProps<P>) => {
  const { url, method } = endpoint(params);
  const fetcher = getFetcher({ method, accessToken });

  return useSWRMutation(url, fetcher);
};
