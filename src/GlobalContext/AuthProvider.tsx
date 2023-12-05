import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface AuthContextProps {
  userId: string | null;
  setAuthenticatedUserId: Dispatch<SetStateAction<string | null>>;
}

const defaultValues: AuthContextProps = {
  userId: null,
  setAuthenticatedUserId: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultValues);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const setAuthenticatedUserId: AuthContextProps['setAuthenticatedUserId'] = (id) => {
    setUserId(id);
  };

  const contextValues: AuthContextProps = {
    userId,
    setAuthenticatedUserId,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
