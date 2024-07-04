import { create } from 'zustand'
import ApiRequest from './AxiosConfig';
export const useNotifStore = create((set) => ({
  Notifications: 0,
  fetchnotifs:async()=>{
    try{
      const res = await ApiRequest.get(`/chats/get/notifications`, { withCredentials: true });
      set({ Notifications: res.data.notifs });
    }catch(err){
      console.log(err);
    }
  
  },
  decrement: () => set((state) => ({ Notifications: state.Notifications - 1 })),
  removeAllBears: () => set({ Notifications: 0 }),
}))