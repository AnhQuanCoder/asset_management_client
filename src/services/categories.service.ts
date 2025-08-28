import axios from "services/axios.customize";

const END_POINT = `/categories`;

export const fetchCategoriesAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<ICategories>>>(urlBackend);
} 