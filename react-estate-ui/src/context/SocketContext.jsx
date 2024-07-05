import { createContext,useState,useContext, useEffect} from 'react'
import { io } from 'socket.io-client';
import { useAuthContext } from './AuthContext';

export const SocketContext = createContext();
export default function SocketContextProvider({children}) {
  const {user} = useAuthContext();  
  const [socket, setsocket] = useState(null);

useEffect(() => {
    setsocket(io(import.meta.env.VITE_SOCKET_URL||"http://localhost:4000"));
    // localStorage.setItem("socket", JSON.stringify(socket));
}, []);
useEffect(() => {
  if(user && socket?.emit) {
    socket.emit("newUser", user.id);
  }
}, [user,socket]);
    

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocketContext() {
    const context = useContext(SocketContext);
    if (context === undefined) {
      throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
}

