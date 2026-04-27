import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout, setLoading } from '../store/authSlice';
import type { RootState } from '../store';
import api from '../services/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      // If no token in state/localStorage, we are done loading
      if (!token) {
        dispatch(setLoading(false));
        return;
      }

      // If token exists, verify it with the backend
      try {
        const { data } = await api.get('/auth/me');
        dispatch(setCredentials({ user: data, token }));
      } catch (err) {
        console.error('Auth verification failed:', err);
        dispatch(logout());
      }
    };

    initAuth();
  }, [dispatch, token]);

  return <>{children}</>;
};
