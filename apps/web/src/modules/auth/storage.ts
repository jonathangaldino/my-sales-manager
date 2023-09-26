export const getToken = () => localStorage.getItem('@msm:token');
export const updateToken = (token: string) => localStorage.setItem('@msm:token', token);
