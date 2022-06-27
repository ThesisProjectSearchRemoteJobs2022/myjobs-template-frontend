import React, { useRef, useState, useEffect, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import usePostLoginUser from "../hooks/usePostLoginUser";
import Swal from "sweetalert2";
import { useStateValue } from '../reducer/StateProvider';
import { Link, Redirect } from 'react-router-dom';

// import AuthContext from "./context/AuthProvider";
import { actionType } from "../reducer/reducer";


const Login = () => {

  // const {setAuth} = useContext(AuthContext);

  const [{ user }, dispatch] = useStateValue()

  const userRef = useRef();
  const errRef = useRef();

  const [userS, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
  
    userRef.current.focus();
    
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userS, pwd]);

  async function loginUser(event) {
    event.preventDefault(); // previene el comportamiento por defecto del botón submit, que es limpiar el formulario

    const userData = {
      email: event.target[1].value,
      password: event.target[2].value,
    };

    console.log(userData);
    // await axios
    //   .post("http://localhost:4000/signin", { userData })
    //   .then((response) => displayMessages(response.data));

    usePostLoginUser(userData).then((response) => {
      console.log("response: ", response);
      displayMessages(response.data);
    });

    function displayMessages(data) {
      console.log(data);
      if (!data.success) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The username and/or password is incorrect!",
        });
      } else {
        localStorage.setItem("token", data.response.token);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      dispatch({
        type: actionType.USER,
        user: data.response,
      });
    }
  }

  function displayMessages(data) {
  
    if (!data.success) {      
      localStorage.setItem("token", data.response.token) 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The username and/or password is incorrect!'        
      })
      
    }
    else {       
      localStorage.setItem("token", data.response.token)  
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Welcome',
        showConfirmButton: false,
        timer: 1500
      })
      
          
    }
    dispatch({
        type: actionType.USER,
        user: data.response
    })    
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: userS,
      password: pwd,
    };
    try {
      const response = await usePostLoginUser(userData);

      console.log("response:", response);
      
      console.log(JSON.stringify(response));
      if(response.error){
        setSuccess(false)
        setErrMsg("Error de conexión");
        return
      }
      if (response.data?.success==false) {
        console.log('FALSE')
        setSuccess(false)
        setErrMsg(response.data.error);
        return
      }
      
      // console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      // const accessToken = response?.data?.response.accessToken;
      const accessToken = response?.data.response.token;
      localStorage.setItem("token", accessToken)
      // setAuth({ user, pwd, accessToken });
      // setUser("");
      setPwd("");
      setSuccess(true);

      dispatch({
        type: actionType.USER,
        user: response?.data.response,
      });
      
    } catch (err) {
      // setErrMsg("Ocurrio un Error");
      if (!err?.response) {
        console.log("catch error",err)
        setErrMsg("Ocurrio un Error");
      }
        // errRef.current.focus();
      
    }
  };

  return (
    
    <>
     
      {user ? (
        
        <section>
          <h1>You are logged in!</h1>
          
          <br />
          <p>
            {/* <a href="#">Go to Home</a> */}

            {/* <Redirect from='/' to='/' />  */}
            <Redirect from='/login' to='/' /> 
            
            {/* <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
          </p>
        </section>
      ) : (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Iniciar sesión
              </h2>
              {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p> */}
            </div>

            {/* //region ALERTA  */}

            <div
              ref={errRef}
              className={errMsg ? "flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" : "hidden"}
              role="alert"
            >
              <svg
                className="w-5 h-5 inline mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <span className="font-medium">Alert!</span> {errMsg}.
              </div>
            </div>
            {/* //endregion */}

            {/* <form className="mt-8 space-y-6" action="#" method="POST" noValidate onSubmit={loginUser}> */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* <input type="hidden" name="remember" defaultValue="true" /> */}

              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username">Correo electrónico:</label>
                  <input
                    type="email"
                    id="username"
                    placeholder="tucorreo@gmail.com"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={userS}
                  
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    placeholder="contraseña"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
            
                {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div> */}

                <div className="text-sm">
                  
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Link to="/register">¿No tienes una cuenta? Registrate</Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Iniciar Sesion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
