import api from "./api";

export default async function lookupSrv(host) {
  try {
    const response = await api.get(
      `/srv?host=${host}`
    );
    return response.data;
  } catch (error) {
    return {
        "Target": host,
        "Port": 25565
    };
  }
}
