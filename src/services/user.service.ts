import axios from "services/axios.customize";

export const fetchUserById = (id: string) => {
  const urlBackend = `users/${id}`;
  return axios.get<IBackendRes<IProfile>>(urlBackend);
}

export const updateUserById = (id: string, data: any) => {
  const urlBackend = `users/${id}`;
  return axios.patch<IBackendRes<IProfile>>(urlBackend, data);
}

export const changePasswordAPI = (data: any) => {
  const urlBackend = `users/change-password`;
  return axios.post<IBackendRes<IProfile>>(urlBackend, data);
}