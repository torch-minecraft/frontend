import api from "./api";

export default async function lookupSrv(host) {
  try {
    const response = await api.get(
      `/api/v1/srv?host=${host}`
    );
    return response.data;
  } catch (error) {
    return {
        "Target": host,
        "Port": 25565
    };
  }
}
