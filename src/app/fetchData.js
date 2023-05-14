import api from "./api";

export default async function fetchData(host, port, type) {
  try {
    type = type.toLowerCase();
    const response = await api.get(
      `/api/v1/status/${type}?host=${host}&port=${port}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
}