import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useSessionData = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setAccessToken(session.user.accessToken);
      setUserId(session.user.id);
    }
  }, [session]);

  return { accessToken, userId };
};
