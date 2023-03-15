import { useState, useEffect } from "react";

type UserData = {
  id: string;
  name: string;
  email: string;
  plan: string;
  emailVerified: boolean;
  formSubmitted: boolean;
  paymentEnabled: boolean;
  paymentReceived: boolean;
  extraNightSelected?: string;
  isVolunteer: boolean;
  accommodation: string;

  tawkToHash: string;
};

export default function useUserData() {
  const [user, setUser] = useState<UserData>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  return { user, isLoading };
}
