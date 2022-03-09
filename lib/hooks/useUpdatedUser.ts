import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";

export default function useUpdatedUser() {
  const { user, error, isLoading, checkSession } = useUser();

  const [isUpdatedUserLoading, setUpdatedUserLoading] = useState(isLoading);

  const [updatedUser, setUpdatedUser] = useState<UserProfile>(user as UserProfile);

  useEffect(() => {
    const checkUser = async () => {
      if (!user?.email_verified) {
        setUpdatedUserLoading(true);

        const response = await fetch("/api/auth/me?refetch=true");
        const updatedUser = await response.json();

        setUpdatedUser(updatedUser);

        await checkSession();

        setUpdatedUserLoading(false);
      } else {
        setUpdatedUserLoading(false);
      }
    };

    checkUser();
  }, [user, checkSession]);

  return { user: updatedUser, error, isLoading: isUpdatedUserLoading };
}
