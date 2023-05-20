import api from "./api";

export default async function status(ip, type) {
  try {
    type = type.toLowerCase();
    const response = await api.get(
      `/status/${type}/${ip}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
}
