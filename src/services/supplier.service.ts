import axios from "services/axios.customize";

const END_POINT = `/suppliers`;

export const fetchSuppliersAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<ISupplier>>>(urlBackend);
}