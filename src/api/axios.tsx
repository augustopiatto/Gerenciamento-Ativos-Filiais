import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://my-json-server.typicode.com/tractian/fake-api/",
});

export const api = {
  get(url: string, id?: number) {
    return axiosInstance.get(url, { params: { id } });
  },
};
