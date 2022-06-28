import axios from "axios";

const API = axios.create({
	baseURL: "https://sparking-a081e.uc.r.appspot.com/api/v1",
	withCredentials: true,
});

export default API;
