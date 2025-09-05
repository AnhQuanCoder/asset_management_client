import axios from "services/axios.customize";

const END_POINT = `/borrow`;

export const fetchBorrowsAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<IBorrow>>>(urlBackend);
}
export const createBorrowAPI = (data: any) => {
  const urlBackend = `${END_POINT}`;
  return axios.post<IBackendRes<IBorrow>>(urlBackend, data);
}