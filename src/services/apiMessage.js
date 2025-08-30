import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export async function sendMessage({ channelId, text }) {
  const { data } = await API.post(`/api/v1/channels/${channelId}/messages`, {
    content: text,
  });
  return data;
}

export async function deleteMessage({ id, channelId }) {
  await API.delete(`/api/v1/channels/${channelId}/messages/${id}`);
  return null;
}
