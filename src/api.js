import axios from "axios";

const api = axios.create({
  baseURL: "https://csaconnect-backend.onrender.com/api/admin",
});

export const loginAdmin = (credentials) => api.post("/auth/login", credentials);
export const getUsers = (token) =>
  api.get("/users", { headers: { Authorization: `Bearer ${token}` } });
export const deleteUser = (id, token) =>
  api.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getPosts = (token) =>
  api.get("/posts", { headers: { Authorization: `Bearer ${token}` } });
export const deletePost = (id, token) =>
  api.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
