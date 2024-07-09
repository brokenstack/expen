import { useSegments, useRouter } from "expo-router";
import { createContext, useContext, useEffect } from "react";
import { useStorageState } from "./useStorageState";

function useProtectedRoute(session: string | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/auth/home");
    } else if (session && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [session, segments]);
}

const AuthContext = createContext<{
  saveToken: (token: string) => void;
  removeToken: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  saveToken: () => null,
  removeToken: () => null,
  session: null,
  isLoading: false,
});

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("token");

  useProtectedRoute(session);
  return (
    <AuthContext.Provider
      value={{
        saveToken(token) {
          setSession(token);
        },
        removeToken() {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}
