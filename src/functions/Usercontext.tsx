import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserData, fetchUserData } from "./UserService";
// import { getAccessToken } from "./tokenService";

interface UserContextType {
  user: UserData | null;
  // userPermissionsName: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  loading: boolean;
  error: any;
  logout: () => void;
  loginSuccess: () => void; // Add this to trigger fetching user data on login
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track if the user just logged in

  // Get role from local storage if available
  // const [userPermissionsName, setUserPermissionsName] = useState<string | null>(
  //   localStorage.getItem('userRole')
  // );
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // const accessToken = getAccessToken();
        // Fetch user data if the user has logged in or userPermissionsName is not set
        if (user === null || undefined) {
          const fetchedUser = await fetchUserData(); // API call to fetch user
          setUser(fetchedUser);
          // const role = fetchedUser.user_permissions?.name;
          // if (role) {
          //   setUserPermissionsName(role);
          //   localStorage.setItem('userRole', role); // Save the role in localStorage
          // }
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [ isLoggedIn]); // Fetch user data on login success or if role is missing

  const logout = () => {
    setUser(null);
    // setUserPermissionsName(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userRole"); // Remove only the role from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const loginSuccess = () => {
    setIsLoggedIn(true); // Trigger user fetching after login
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, error, logout, loginSuccess }}
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

// export const useUserPermissionsName = (): string | null => {
//   // const { userPermissionsName } = useUser();
//   return userPermissionsName;
// };
