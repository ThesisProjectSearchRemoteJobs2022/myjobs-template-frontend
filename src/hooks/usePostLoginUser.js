import { BASE_URL, BASE_URL_AUTH } from "../constants/api";
import axios from "axios";

const useLoginUser = async (userData) => {

	try {
		
		const response = await axios.post(BASE_URL_AUTH+'signIn',  {userData:userData} )
		return response

	} catch (error) {
		console.log("Error:", error)
		return {error:error}
	}
	
};
//useLoginUser
export default useLoginUser;
