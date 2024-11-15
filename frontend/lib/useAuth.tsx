'use client'
import { useContext, useEffect, useState, createContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, login } from '@/app/api/user/route';

interface AuthContextType {
  auth: boolean;
  authLoading: boolean;
  auth_login: (username: string, password: string) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const check_auth = async () => {
    setAuthLoading(true);  // Ensure loading state is updated before the check
    try {
      await getAuth();
      setAuth(true);
    } catch {
      setAuth(false);
    } finally {
      setAuthLoading(false);  // Complete loading state after the check
    }
  }

  const auth_login = async (username: string, password: string) => {
    setError(null);
    try {
      const data = await login(username, password);
      if (data.success) {
        setAuth(true);
        router.push(`/rant/`);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch {
      setError('An error occurred during login. Please try again.');
    }
  };


  useEffect(() => {

      check_auth();

  }, [window.location.pathname]);



  return (
    <AuthContext.Provider value={{ auth, authLoading, auth_login, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
