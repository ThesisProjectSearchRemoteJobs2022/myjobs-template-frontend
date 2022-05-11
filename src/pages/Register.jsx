import React, { useRef, useState, useEffect, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import usePostRegisterUser from "../hooks/usePostRegisterUser";
import { Link, Redirect } from 'react-router-dom';
import { useStateValue } from '../reducer/StateProvider';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import toast, { Toaster } from 'react-hot-toast';
const MySwal = withReactContent(Swal)

const Register = () => {
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

  
  const showHotToastMessage = (hasError,message) => {
    if (hasError) {
      toast.error(message)
      return
    }
    toast(message,{
      icon: '🔔',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }

    
    )};

  function displayMessages(data) {
    console.log("displayMessages : ",data)
    if (data.success === "falseVAL") {
      // let errorDetalles = data.response.error.details;
      let errorDetalles = data.response
      
      
    } else if (data.success === true) {


      //TODO VER LAS ALERTAS NO FUNCIONA EL DISEÑOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      // MySwal.fire({
      //   title: <p>Good</p>,
      //   footer: 'success',
      //   didOpen: () => {
      //     // `MySwal` is a subclass of `Swal`
      //     //   with all the same instance & static methods
      //     MySwal.clickConfirm()
      //   }
      // }).then(() => {
      //   return MySwal.fire(<p>Registered user with SingIn!, <br /> We have sent an e-mail to verify your e-mail address</p>)
      // })

      showHotToastMessage(false,data.response)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const NuevoUsuario = {
      imageUser:e.target[0].value,
      firstname:e.target[0].value,
      lastname:e.target[1].value,
      email:e.target[2].value,
      password:e.target[3].value,
      from:"SignUp"                        
    }          
  
    
    try {
      const response = await usePostRegisterUser(NuevoUsuario);
  
      console.log("response:", response);
      
      console.log(JSON.stringify(response));
      
      if(response.error){
        
        setErrMsg(response.error.message);
        return
      }
      if (response.data?.success === false) {
        console.log("FALSE user exists");
        let errorUserAlreadyExist = response.data?.response;
        setErrMsg(errorUserAlreadyExist);

        return;
      }

      if (response.data?.success === "falseVAL") {
        console.log("FALSE ERROR");
        let errorDetalles = response.data?.response;
        let errorMessage = "";
        errorMessage= errorDetalles.map((errorMsg,i) => {
          // setErrMsg(response.data?.response.join(""));
          return <li key={i}>{errorMsg}</li>
        });

        setErrMsg(errorMessage);

        return;
      }
      
      setErrMsg("");
      setPwd("");
      setSuccess(true);
      
      displayMessages(response.data)
      
    } catch (err) {
      // setErrMsg("Ocurrio un Error");
      if (!err?.response) {
        console.log("catch error",err)
        // setErrMsg("Ocurrio un Error");
      }
        // errRef.current.focus();
      
    }
  };

  return (
    <>
      {user ? (
        <Redirect from="/login" to="/" />
      ) : (
        <div className="main">
            <Toaster
            position="bottom-center"
            reverseOrder={true}
          />

          <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Informacion Personal
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                  Use una dirección gmail donde pueda recibir correos.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  {/* //region ALERTA  */}
                  <div className="px-4 sm:px-6">
                    <div
                      ref={errRef}
                      className={
                        errMsg
                          ? "flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
                          : "hidden"
                      }
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
                        <span className="font-medium">Alert!</span> {errMsg}
                      </div>
                    </div>
                  </div>
                  {/* //endregion */}
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nombre
                          </label>
                          <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={userS}
                            required
                            // autoComplete="given-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="lastname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Apellido
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            autoComplete="family-name"
                            required
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Correo Gmail
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            required
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Contraseña
                          </label>
                          <input
                            type="password"
                            name="passwod"
                            id="passwod"
                            required
                            // fullWidth

                            label="Password"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        {/* <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div> */}
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <Link className=" py-2 px-4" to="/login">
                        {"¿Ya tienes una cuenta? Inicia Sesion"}
                      </Link>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Registrarme
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Register;