import api from "./api";

export default async function ping() {
  const response = await api.get(`/ping`);
  return response.data;
}
