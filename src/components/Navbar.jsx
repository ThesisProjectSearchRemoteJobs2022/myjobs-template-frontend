import React, { useEffect } from "react";
import { Link as LinkRouter } from "react-router-dom";
// import AuthContext from "../pages/context/AuthProvider";
import { useStateValue } from "../reducer/StateProvider";
import { actionType } from "../reducer/reducer";
import useValidarToken from "../hooks/usePostVerficiarToken";
import useLogOut from "../hooks/usePostLogOut";
import Swal from "sweetalert2";

function Button({text, bg, padding}) {
  return (
    <div>
      <button
        className={`
          ${padding || 'px-6 py-2'} text-sm font-semibold uppercase 
          rounded-sm text-white transition ${bg}`}
      >
        <span>{text}</span>
      </button>
    </div>
  );
}

const validLocalToken =()=>{

  if (localStorage.getItem("token") !== null) {
    const token = localStorage.getItem("token");
    // axios
    //   .get("https://itinerarioapp.herokuapp.com/api/signInToken", {
    //     headers: {
    //       Authorization: "Bearer " + token, //espacio ya aplicado
    //     },
    //   })
    //   .then((user) => {
    //     if (user.data.success) {
    //       dispatch({
    //         type: actionType.USER,
    //         user: user.data,
    //       });
    //     } else {
    //       localStorage.removeItem("token");
    //     }
    //   });
    useValidarToken(token).then((response) => {
      console.log("response: ", response);
      if (user.data.success) {
        dispatch({
          type: actionType.USER,
          user: user.data,
        });
      } else {
        localStorage.removeItem("token");
      }
    });
  }

}

function Navbar() {
  
  const [{ user }, dispatch] = useStateValue()

  async function cerrarCesion() {
    const email = user.datosUser.email
    console.log(email)

    await useLogOut(email).then((response) => {
      console.log("response: ", response);
      if(response.data.success) {
        localStorage.removeItem("token")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Come back soon, thanks for your visit',
          showConfirmButton: false,
          timer: 1500
        })
        dispatch({
          type:actionType.USER,
          user:null
        })
        
      }
    });
    
    // await axios.post("http://localhost:5000/api/signOut", {email})
    // .then(response =>{                   
    //     if(response.data.success) {
    //       localStorage.removeItem("token")
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'success',
    //         title: 'Come back soon, thanks for your visit',
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //       dispatch({
    //         type:actionType.USER,
    //         user:null
    //       })
          
    //     }
      

    //    })

}

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      useValidarToken(token).then((response) => {
        console.log("response: ", response);
        if (response.data.success) {
          dispatch({
            type: actionType.USER,
            user: response.data,
          });
        } else {
          localStorage.removeItem("token");
        }
      });
    }
  },[])

  // const [isLoggedIn, setLoggedIn] = useState(false);

  // const {setAuth} = useContext(AuthContext);
  return (
    <>
      <div className="fixed left-0 right-0 top-0 h-16 shadow-md border-b-2 border-gray-100 bg-gray-900">
        <nav className="flex items-center container mx-auto h-full justify-between">
          <h1 className="font-semibold uppercase text-lg text-gray-200">
            📢 JoBoard-pe
          </h1>
          <div>
            <ul className="flex items-center space-x-10 text-sm">
              <li>
                <LinkRouter
                  to="/"
                  className="text-gray-400 hover:text-gray-100"
                >
                  Home
                </LinkRouter>
              </li>
              <li>
                <LinkRouter
                  to="/about"
                  className="text-gray-400 hover:text-gray-100"
                >
                  About Us
                </LinkRouter>
              </li>
              <li>
                <LinkRouter
                  to="/docs"
                  className="text-gray-400 hover:text-gray-100"
                >
                  Docs
                </LinkRouter>
              </li>
            </ul>
          </div>
          <div>
            {/* <Link to="/login" className="text-gray-400 hover:text-gray-100">
          <Button text="Login" bg="bg-gradient-to-r from-purple-500 to-blue-500"/>
          
          </Link> */}
          </div>

          {/* <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"> */}

          <div>
            {!user ? (
                <>
              <LinkRouter
                to="/login"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign In
              </LinkRouter>
                <LinkRouter
                to="/register"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                Sign up
                </LinkRouter>
                </>
            ) : (
            
              <LinkRouter
                to="/signout"
                onClick={() => cerrarCesion()}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Out
              </LinkRouter>

          
            )}

            
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
