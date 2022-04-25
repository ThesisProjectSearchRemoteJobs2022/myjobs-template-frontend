import { BASE_URL } from "../constants/api";
import axios from "axios";

const useGetData = async (obj) => {
	const res = axios({
		method: "GET",
		url: BASE_URL + obj.url,
	}).then(function (response) {
		let { data } = response;
		return data;
	});
	return res;
};

export default useGetData;

