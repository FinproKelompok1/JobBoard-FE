import axios from "axios";

const base_url_be = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default axios.create({
  baseURL: base_url_be,
});
