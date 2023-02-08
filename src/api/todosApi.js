import axios from "axios";

/**
 * Public baseURL from firebase
 */
const todosApi = axios.create({
  baseURL:
    "https://todos-app-a27eb-default-rtdb.europe-west1.firebasedatabase.app",
});

export default todosApi;
