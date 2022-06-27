import React, { Fragment, useEffect } from "react";
import { Link as LinkRouter } from "react-router-dom";
// import AuthContext from "../pages/context/AuthProvider";
import { useStateValue } from "../reducer/StateProvider";
import { actionType } from "../reducer/reducer";
import useValidarToken from "../hooks/usePostVerficiarToken";
import useLogOut from "../hooks/usePostLogOut";
import Swal from "sweetalert2";


import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, UserIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
]


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
      console.log("response Welcome Back 2: ", response);
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
        console.log("response Welcome Back: ", response);
        //TODO WELCOM BACK USER signInToken
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // const [isLoggedIn, setLoggedIn] = useState(false);

  // const {setAuth} = useContext(AuthContext);
  return (
    <>
      {/* <div className="fixed left-0 right-0 top-0 h-16 shadow-md border-b-2 border-gray-100 bg-gray-900">
        <nav className="flex items-center container mx-auto h-full justify-between">
          <h1 className="font-semibold uppercase text-lg text-gray-200">
            📢 Joboardevs
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
            
            </ul>
          </div>
          <div>
        
          </div>

        

          <div>
            {!user ? (
                <>
              <LinkRouter
                to="/login"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Iniciar Sesion
              </LinkRouter>
                <LinkRouter
                to="/register"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                Registrarse
                </LinkRouter>
                </>
            ) : (
            
              <LinkRouter
                to="/signout"
                onClick={() => cerrarCesion()}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Cerrar Sesion
              </LinkRouter>

          
            )}

            
          </div>
        </nav>
      </div> */}

    <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />

                      <div>

                      </div>
                      <h1 className="font-semibold uppercase text-lg text-gray-200">
                                  📢 Joboardevs
                      </h1>
                    
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                    {/* https://cdn-icons-png.flaticon.com/512/64/64572.png */}
                      <div>
                        <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          {!user ? (
                            <>
                            <UserIcon class="h-5 w-5" aria-hidden="true" />
                              {/* <img
                                className="h-8 w-8 rounded-full"
                                src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                                alt=""
                              /> */}
                            </>):(
                            <>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
                                alt=""
                              />
                            </>)}
                        
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          
                        {!user ? (
                            <>
                          

                            <Menu.Item>
                              {({ active }) => (
                                <LinkRouter
                                  to="/login"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                  Iniciar Sesion
                                </LinkRouter>
                              )}
                            </Menu.Item>
                            
                            <Menu.Item>
                              {({ active }) => (

                                
                                <LinkRouter
                                  to="/register"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Registrarse
                                </LinkRouter>
                              )}
                            </Menu.Item>

                            </>
                        ) : (
                          
                          <>
                          <Menu.Item>
                          {({ active }) => (
                            <LinkRouter
                              to="/profile"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </LinkRouter>
                          )}
                          </Menu.Item>
                      
                          <Menu.Item>
                            {({ active }) => (
                              
                            //   <LinkRouter
                            //   to="/signout"
                            //   onClick={() => cerrarCesion()}
                            //   className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            // >
                            //   Cerrar Sesion
                            // </LinkRouter>

                              <LinkRouter
                                to="/signout"
                                onClick={() => cerrarCesion()}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Cerrar Sesion
                              </LinkRouter>
                            )}
                          </Menu.Item>

                          


                          </>

                          
                        

                      
                        )}

                          
                        
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

    </>
  );
}

export default Navbar;
