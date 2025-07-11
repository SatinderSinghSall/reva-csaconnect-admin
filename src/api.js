import axios from "axios";

const api = axios.create({
  baseURL: "https://csaconnect-backend.onrender.com/api/admin",
});

/*
  > IN Production / Deployment API Link:
  https://csaconnect-backend.onrender.com

  > Development API Link:
  http://localhost:5000/
*/

export const loginAdmin = (credentials) => api.post("/auth/login", credentials);
export const getUsers = (token) =>
  api.get("/users", { headers: { Authorization: `Bearer ${token}` } });
export const deleteUser = (id, token) =>
  api.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getPosts = (token) =>
  api.get("/posts", { headers: { Authorization: `Bearer ${token}` } });
export const deletePost = (id, token) =>
  api.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getAdmins = (token) =>
  api.get("/admins", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteAdmin = (id, token) =>
  api.delete(`/admins/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateAdmin = (id, data, token) =>
  api.put(`/admins/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteComment = (postId, commentId, token) =>
  api.delete(`/posts/${postId}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getChallengeCount = (token) =>
  api.get("/challenges/count", {
    headers: { Authorization: `Bearer ${token}` },
  });
