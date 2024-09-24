// UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAccessToken } from "./tokenService";
import { fetchUserData, UserData } from "./UserService";
// import { access } from "fs";

interface UserContextType {
  user: UserData | null;
  userPermissionsName: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  loading: boolean;
  error: any;
  logout: () => void;
}
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const userPermissionsName = user?.user_permissions?.name || null;

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    const getUserData = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, userPermissionsName, setUser, loading, error, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useUserPermissionsName = (): string | null => {
  const { user } = useUser();
  console.log("🚀 ~ useUserPermissionsName ~ user:", user)
  console.log("🚀 ~ useUserPermissionsName ~ role:", user?.user_permissions?.name)
  return user?.user_permissions?.name || null;
};
