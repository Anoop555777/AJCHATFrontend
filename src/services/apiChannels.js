import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export async function getMyChannels() {
  const { data } = await API.get("/api/v1/channels/me/my-channels");
  return data?.channels;
}

export async function getChannel(channelId) {
  const { data } = await API.get(`/api/v1/channels/${channelId}`);

  const result = {
    ...data?.channel,
    role: data?.role,
  };
  return result;
}

export async function createChannel({ name, description, members }) {
  const { data } = await API.post(
    "/api/v1/channels",
    {
      name,
      description,
      members,
    },
    {
      withCredentials: true,
    }
  );

  return data?.data?.channel;
}

export async function exitSelfFromChannel(channelId) {
  await API.delete(`/api/v1/channels/${channelId}/members/exit`);

  return null;
}

export async function deleteChannel(channelId) {
  await API.delete(`/api/v1/channels/${channelId}`);

  return null;
}

export async function editChannel({ channelId, formData }) {
  const response = await API.patch(`/api/v1/channels/${channelId}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response?.data?.channel;
}
