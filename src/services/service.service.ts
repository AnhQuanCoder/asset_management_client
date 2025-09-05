import axios from "services/axios.customize";

const END_POINT = `/services`;

export const fetchServicesAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<IService>>>(urlBackend);
}