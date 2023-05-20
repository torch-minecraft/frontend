import api from "./api";

export default async function favicon(ip, type) {
  try {
    type = type.toLowerCase();
    const response = await api.get(
      `/status/${type}/${ip}`
    );
    return response.data.favicon;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
}
