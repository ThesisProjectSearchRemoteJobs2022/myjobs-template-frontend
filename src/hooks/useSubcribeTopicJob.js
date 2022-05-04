import { BASE_URL, BASE_URL_AUTH } from "../constants/api";
import axios from "axios";

const useSubcribeTopicJob = async (data) => {

	try {
		// const response = await axios.get(BASE_URL_AUTH+'send-email-jobs',  {
		const response = await axios.get(BASE_URL_AUTH+'subscribe-send-email',  {
			params:data
		} )

		return response

	} catch (error) {
		console.log("catch Error:", error)
		
		return {success:false,message : "Error de Conexion", error:error, errorMessage:error.message}
	}
	
};

export default useSubcribeTopicJob;
