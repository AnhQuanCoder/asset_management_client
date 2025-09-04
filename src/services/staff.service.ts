import axios from 'services/axios.customize';

const END_POINT = `/users`;

export const fetchUsersAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<IStaff>>>(urlBackend);
}

export const createUserAPI = (data: any) => {
  const urlBackend = `${END_POINT}`;
  return axios.post<IBackendRes<IStaff>>(urlBackend, data);
}