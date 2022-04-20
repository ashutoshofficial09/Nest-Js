import Axios from "../setup/axios";

export function getBookmark() {
  let request;
  request = Axios.get("/bookmark");
  return request
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function addBookmark(title, description, price) {
  const request = Axios.post("/bookmark", { title, description, price });
  return request
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return error;
    });
}

// axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
// .then(res => {
//   console.log(res);
//   console.log(res.data);

export function deleteBookmark(id) {
  const request = Axios.delete(`/bookmark/${id}`);
  return request
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function updateBookmark(id, title, description, price) {
  const request = Axios.put(`/bookmark/${id}`, { title, description, price });
  return request
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
}
