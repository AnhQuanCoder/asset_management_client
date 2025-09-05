import axios from "services/axios.customize";

const END_POINT = `/assets`;

export const fetchAssetsAPI = (params?: string) => {
  const urlBackend = params ? `${END_POINT}?${params}` : `${END_POINT}?current=1&pageSize=1000&sort=-createdBy`
  // const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<IAsset>>>(urlBackend);
}

// export const createCategoryAPI = (data: any) => {
//   const urlBackend = `${END_POINT}`;
//   return axios.post<IBackendRes<ICategories>>(urlBackend, data);
// }

// export const editCategoryById = (id: string, data: any) => {
//   const urlBackend = `${END_POINT}/${id}`;
//   return axios.patch<IBackendRes<ICategories>>(urlBackend, data);
// }

// export const deleteCategoryById = (id: string) => {
//   const urlBackend = `${END_POINT}/${id}`;
//   return axios.delete<IBackendRes<ICategories>>(urlBackend);
// }