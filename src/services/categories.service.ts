import axios from "services/axios.customize";

const END_POINT = `/categories`;

export const fetchCategoriesAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<ICategories>>>(urlBackend);
}

export const createCategoryAPI = (data: any) => {
  const urlBackend = `${END_POINT}`;
  return axios.post<IBackendRes<ICategories>>(urlBackend, data);
}

export const editCategoryById = (id: string, data: any) => {
  const urlBackend = `${END_POINT}/${id}`;
  return axios.patch<IBackendRes<ICategories>>(urlBackend, data);
}