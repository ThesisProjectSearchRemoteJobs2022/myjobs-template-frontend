import { BASE_URL, BASE_URL_AUTH } from "../constants/api";
import axios from "axios";

const useLogOut = async (email) => {

	try {
		const response = await axios.post(BASE_URL_AUTH+'signOut',   {email} )

		return response

	} catch (error) {
		console.log("Error:", error)
		return {error:error}
	}
	
};
//usePostLogOut
export default useLogOut;

