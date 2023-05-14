import api from "./api";

export default async function ping() {
  const response = await api.get(`/api/v1/ping`);
  return response.data;
}
