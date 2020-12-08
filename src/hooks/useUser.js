import { useCallback, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import fetchApi from "../lib/fetchApi";

const useUser = async () => {
  const { user, setUser } = useUserContext();

  const getMe = useCallback(async () => {
    const { success, data } = await fetchApi("/api/auth/me", {
      credentials: "include",
    });

    if (success) {
      await setUser(data);
    }
  }, [setUser]);

  useEffect(() => {
    if (!user) {
      getMe();
    }
  }, [getMe, user]);

  return;
};

export default useUser;
