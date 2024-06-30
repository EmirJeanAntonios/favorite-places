import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Accept-Language": "en",
  },
});

export default axiosClient;
