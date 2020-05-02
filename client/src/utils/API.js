import axios from "axios";

export default {
  getUsers() {
    return axios.get(`/api/users`);
  },
  getUser(id) {
    return axios.get(`/api/users/${id}`);
  },
  deleteUser(id) {
    return axios.delete(`/api/users/${id}`);
  },
  saveUser(userData) {
    return axios.post(`/api/users`, userData);
  },
  updateUser(id, userData) {
    return axios.put(`/api/users/${id}`, userData);
  },
  updateUserNewPost(id, postId) {
    return axios.put(`/api/users/post/${id}`, postId);
  },
  updateRemoveUserPost(id, postId) {
    return axios.put(`/api/users/pull/${id}`, postId);
  },
  addPost(postData) {
    return axios.post(`/api/classifieds`, postData);
  },
  deletePost(id) {
    return axios.delete(`/api/classifieds/${id}`);
  },
};