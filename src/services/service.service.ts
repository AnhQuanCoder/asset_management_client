import axios from "services/axios.customize";

const END_POINT = `/services`;

export const fetchServicesAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<IService>>>(urlBackend);
}

export const deleteServiceAPI = (id: string) => {
  const urlBackend = `${END_POINT}/${id}`;
  return axios.delete<IBackendRes<IService>>(urlBackend);
}