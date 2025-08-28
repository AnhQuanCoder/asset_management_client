import axios from "services/axios.customize";

const END_POINT = `/auth`;

export const loginAPI = (data: any) => {
  const urlBackend = `${END_POINT}/login`;
  return axios.post<IBackendRes<ILogin>>(urlBackend, data);
}

export const getAccountAPI = () => {
  const urlBackend = `${END_POINT}/account`;
  return axios.get<IBackendRes<IGetAccount>>(urlBackend);
}

export const logoutAPI = () => {
  const urlBackend = `${END_POINT}/logout`;
  return axios.post<IBackendRes<ILogin>>(urlBackend);
}