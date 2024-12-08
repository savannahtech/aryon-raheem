import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {setAuthToken} from "../services/api.service";

interface AuthState {
  token?: string;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      login: (token: string) => {
        setAuthToken(token);
        set(() => ({token}));
      },
      logout: () => {
        setAuthToken();
        set(() => ({token: undefined}))
      },
    }),
    {
      name: 'authStore'
    },
  ),
);

export default useAuthStore;
