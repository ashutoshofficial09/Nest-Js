import Axios from "../setup/axios";

export function getExpense() {
  const request = Axios.get("/expense");
  return request
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function addExpense(item, quantity, price) {
  const request = Axios.post("/expense", { item, quantity, price });
  return request
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteExpense(id) {
  const request = Axios.delete(`/expense/${id}`);
  return request
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
}
