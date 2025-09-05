import axios from "services/axios.customize";

const END_POINT = `/suppliers`;

export const fetchSuppliersAPI = (params?: string) => {
  const urlBackend = params ? `${END_POINT}?${params}` : `${END_POINT}?current=1&pageSize=1000&sort=-createdBy`;
  return axios.get<IBackendRes<IModelPaginate<ISupplier>>>(urlBackend);
}

export const createSupplierAPI = (data: any) => {
  const urlBackend = `${END_POINT}`;
  return axios.post<IBackendRes<ISupplier>>(urlBackend, data);
}

export const editSupplierAPI = (id: string, data: any) => {
  const urlBackend = `${END_POINT}/${id}`;
  return axios.patch<IBackendRes<ISupplier>>(urlBackend, data);
}

export const deleteSupplierAPI = (id: string) => {
  const urlBackend = `${END_POINT}/${id}`;
  return axios.delete<IBackendRes<ISupplier>>(urlBackend);
}