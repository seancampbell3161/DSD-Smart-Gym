import type { ReactNode } from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "@clerk/clerk-react";

const ProfileContext = createContext<IProfile | null>(null);

interface IProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  gym_id: string;
}

export const ProfileProvider = ({ children }: {children: ReactNode}) => {
  const { getToken, userId, isSignedIn } = useAuth();
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
      if (!isSignedIn) {
        setProfile(null);
        return;
      }
      (async () => {
      try {
        const token = await getToken();
        const res = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data: IProfile = await res.json();
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setProfile(null);
      }
    })();
  }, [getToken, userId, isSignedIn]);

  return <ProfileContext.Provider value={ profile }>{children}</ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext);
