import { BASE_URL, BASE_URL_AUTH } from "../constants/api";
import axios from "axios";

const useSubcribeTopicJob = async (data) => {

	try {
		const response = await axios.get(BASE_URL_AUTH+'send-email-jobs',  {
			params:data
		} )

		return response

	} catch (error) {
		console.log("Error:", error)
		return {error:error}
	}
	
};

export default useSubcribeTopicJob;
