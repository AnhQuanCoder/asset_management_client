import axios from "services/axios.customize";

const END_POINT = `/borrow`;

export const fetchBorrowsAPI = (params: string) => {
  const urlBackend = `${END_POINT}?${params}`;
  return axios.get<IBackendRes<IModelPaginate<IBorrow>>>(urlBackend);
}