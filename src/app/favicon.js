import api from "./api";

export default async function favicon(host, port, type) {
  try {
    type = type.toLowerCase();
    const response = await api.get(
      `/status/${type}?host=${host}&port=${port}`
    );
    return response.data.favicon;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
}