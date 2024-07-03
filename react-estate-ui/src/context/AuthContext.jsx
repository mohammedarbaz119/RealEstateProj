import { createContext,useState,useContext, useEffect} from 'react'

export const AuthContext = createContext();
export default function AuthContextProvider({children}) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
);
const updateUser = (user) => {
    setUser(user);
}
useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
}, [user]);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
}

