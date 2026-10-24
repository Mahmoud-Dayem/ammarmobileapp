import {
  createContext,
  useEffect,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useRouter, useSegments } from "expo-router";

export type AuthUser = {
  id: string;
  email?: string | null;
  displayName?: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const userDat= {
    
  }
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const isInAuthGroup = segments[0] === "(auth)";

    if (!isLoading && !user && !isInAuthGroup) {
      router.replace("/(auth)");
    }
  }, [isLoading, router, segments, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        setUser,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return auth;
}
