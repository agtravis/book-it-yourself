import axios from "axios";

export default {
  getUsers() {
    return axios.get(`/api/users`);
  },
  getUsersWithPosts() {
    return axios.get(`/api/usersposts`);
  },
  getUser(id) {
    return axios.get(`/api/user/${id}`);
  },
  searchUser(searchString) {
    return axios.post(`/api/users/user`, { search: searchString });
  },
  deleteUser(id) {
    return axios.delete(`/api/user/${id}`);
  },
  getPosts() {
    return axios.get(`/api/classifieds`);
  },
  updateUser(id, userData) {
    return axios.put(`/api/user/${id}`, userData);
  },
  updateUserNewPost(id, postId) {
    return axios.put(`/api/user/post/${id}`, postId);
  },
  updateRemoveUserPost(id, postId) {
    return axios.put(`/api/user/pull/${id}`, postId);
  },
  addPost(postData) {
    return axios.post(`/api/classifieds`, postData);
  },
  deletePost(id) {
    return axios.delete(`/api/classifieds/${id}`);
  },
  updatePost(id, postData) {
    return axios.put(`/api/classifieds/${id}`, postData);
  },
};
