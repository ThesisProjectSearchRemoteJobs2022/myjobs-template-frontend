import { BASE_URL, BASE_URL_AUTH } from "../constants/api";
import axios from "axios";

const useRegister = async (NuevoUsuario) => {

	try {
		const response = await axios.post(BASE_URL_AUTH+'signup',   {NuevoUsuario} )

		return response

	} catch (error) {
		console.log("Error:", error)
		return {error:error}
	}
	
};
//usePostLogOut
export default useRegister;

