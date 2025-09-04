import axios from 'services/axios.customize';

const END_POINT = `/users`;

export const fetchUsersAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<IStaff>>>(urlBackend);
}