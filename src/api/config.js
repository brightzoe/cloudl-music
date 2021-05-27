import axios from "axios";
export const baseUrl = "http://192.168.1.140:7788";
//创建axios实例，设置拦截器
const axiosInstance = axios.create({
	baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
	(res) => res.data,
	(err) => {
		console.log(err, "网络错误");
	}
);
export { axiosInstance };
