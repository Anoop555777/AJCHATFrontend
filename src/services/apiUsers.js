import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export async function getAllMembers() {
  const { data } = await API.get("/api/v1/users/getAllChannelMembers");

  return data?.members;
}

export async function getUsersOfChannel(channelId) {
  const { data } = await API.get(`/api/v1/channels/${channelId}/members`);

  return data?.members;
}

export async function addUserToChannel(channelId, members) {
  const { data } = await API.post(
    `/api/v1/channels/${channelId}/members`,
    {
      members,
    },
    {
      withCredentials: true,
    }
  );

  return data?.members;
}

export async function removeUserFromChannel(channelId, userId) {
  await API.delete(`/api/v1/channels/${channelId}/members/${userId}`, {
    withCredentials: true,
  });

  return null;
}

export async function updatePassword({
  currentPassword,
  password,
  confirmPassword,
}) {
  const { data } = await API.patch(
    `/api/v1/auth/updatePassword`,
    {
      currentPassword,
      password,
      confirmPassword,
    },
    {
      withCredentials: true,
    }
  );
  return data?.user;
}

export async function updateProfile(formData) {
  const response = await API.patch("/api/v1/users/updateMe", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response?.data?.user;
}
