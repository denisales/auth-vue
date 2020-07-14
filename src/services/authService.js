import api from '@/services/api';

export const refreshTokenService = () => api.get('refresh_token', { skipAuthRefresh: true });

export const logoutService = () => api.get('logout');

export const loginService = ({ email, password }) => api.post('sessions', { email, password }, { skipAuthRefresh: true });
