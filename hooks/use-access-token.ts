import { useSession } from "next-auth/react";

export const useAccessToken = () => {
  const { data: session } = useSession();
  return session?.user.accessToken;
};
