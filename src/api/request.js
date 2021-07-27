import { axiosInstance } from "./config";

//推荐页banner
export const getBannerRequest = () => {
	return axiosInstance.get("/banner");
};

//推荐页歌曲数据
export const getRecommendListRequest = () => {
	return axiosInstance.get("./personalized");
};

//歌手页hot歌手数据
export const getHotSingerListRequest = (count) => {
	return axiosInstance.get(`/top/artists?offset=${count}`);
};

//歌手页数据
export const getSingerListRequest = (type, alpha = "", count) => {
	return axiosInstance.get(
		`/artist/list?type=${type[0] || "-1"}&area=${type[1] || "-1"}&initial=${alpha.toLowerCase()}&offset=${count}`
	);
};
