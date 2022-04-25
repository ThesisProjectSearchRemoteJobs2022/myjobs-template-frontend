import { BASE_URL, BASE_URL_AUTH } from "../constants/api";
import axios from "axios";

const useValidarToken = async (token) => {

	try {
		const response = await axios.get(BASE_URL_AUTH+'signInToken',  {
			headers:{
            'Authorization':'Bearer '+ token //espacio ya aplicado
          }
		} )

		return response

	} catch (error) {
		console.log("Error:", error)
		return {error:error}
	}
	
};

export default useValidarToken;
