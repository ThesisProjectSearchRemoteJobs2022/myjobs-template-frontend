import { Fragment, useEffect, useRef, useState } from "react";
import useGetData from "../hooks/useGetData";
import useSubcribeTopicJob from "../hooks/useSubcribeTopicJob";

// import Header from "./Header";
import { useStateValue } from '../reducer/StateProvider';
import JobCard from "./JobCard";

import { Dialog, Transition } from '@headlessui/react';
import {KeyIcon, MailIcon } from '@heroicons/react/outline';
// import lista from "../data/information";
// import lista from "../data/information";

const JobsList = () => {
  const [{ user }, dispatch] = useStateValue()
  const [jobs, setJobs] = useState([]);
  const [jobSearch, setJobSearch] = useState(['Desarrollador Web']);

  
  const [hasJobs, setHasJobs] = useState(false)

  const cancelButtonRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [openDialog2, setOpenDialog2] = useState(false)
  
  const getJobsList = (jobSearchArg = "desarrollador") => {
    if (jobSearch != null) jobSearchArg = jobSearch;
    
    useGetData({
      url: `getJobs?trabajo=${jobSearchArg}`,
    }).then((data) => {
      console.log(data);
      setJobs(data.jobs); 

      setHasJobs(data.success);
    }).catch(error=>{
      console.log("error",error.message)
    });
  };

  const handle = (e)=>{
    const ofertVa = e.target.value
    setJobSearch(ofertVa)
    console.log(ofertVa)
  }
  const submit = ()=>{
    
    // const ofertVa = e.target.value
    getJobsList()
    // console.log("submit:",ofertVa)
    
  }
  
  const confirmarSubscripcion = async (usuario)=>{
    try {
      console.log(usuario)
      const usuariObj  = usuario.user
      if(!usuariObj ){
        
        setOpenDialog2(true)
        // return
      }else{
        setOpen(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  

    


    
  }
  const subcribirseNotificacionesEmail = async (usuario) => {
    // e.preventDefault();
    
    // console.log(user)
    try {
      const usuariObj  = usuario.user
      if(jobSearch==""){
        console.log("Ingrese el empleo a buscar")
        return
      }
      if(!usuariObj ){
        console.log("Primero inicie sesion")
        // return
      }
      
        const response = await useSubcribeTopicJob({
          trabajo: jobSearch,
          email: usuariObj.datosUser.email,
        });

      console.log("response:", response);
      console.log("data> data: ",response.data)
      console.log("stado: ",response.data.success)
      console.log("message: ",response.data.message)

      if(response.status!=200){
        alert("Sin conexion")
        return
      }
      
      if(response.data.success==false){
        alert("Mensaje: "+response.data.message)
        return
      }

      setOpen(false) //cerrar

      // setOpenDialog2(false)

      // await useSubcribeTopicJob({
      //   trabajo: jobSearch,
      //   email: usuariObj.datosUser.email,
      // }).then((data) => {
      //   console.log("data: ",data);
      //   console.log("data> data: ",data.data);
      
      //   // setHasJobs(data.success);
      //   setOpen(false)
      //   // setOpenDialog2(false)
      // }).catch(error=>{
      //   console.log("error",error.message)
      // });

      
    console.log("JSON USUARI RECIBIDO", usuario)
    console.log("busqueda CLik", jobSearch)
      console.log(`Hola ${usuariObj.datosUser.firstname}. Se subscribira a recibir notificaciones de [${jobSearch}]
      a su corre ${usuariObj.datosUser.email} \n Confirmar [SI]`)
    } catch (error) {
      console.log("error",error.message)
    }
    
  }
  useEffect(() => {
    
    // getJobsList();
     
  }, []);
  return (
    <div>
      {/* {console.log(jobs)} */}
      {/* {console.log('usuario',user)} */}
      {/* <!-- image search box --> */}
      <div className="main">
        <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          {/* <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
            <div className=" relative ">
                <input type="text" id="&quot;form-subscribe-Subscribe" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                </div>
                <button 
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" 
                type="submit">
                    Subscribe
                </button>
          </form> */}

          <Transition.Root show={openDialog2} as={Fragment}>
            <Dialog
              as="div"
              className=" fixed z-10 inset-0 overflow-y-auto"
              initialFocus={cancelButtonRef}
              onClose={setOpenDialog2}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <KeyIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Inicio de Sesion requerido
                          </Dialog.Title>
                          <div className="mt-2 flex ">
                            <p className="text-sm text-gray-500 w-full">
                              Para recibir Recibir Correos requiere iniciar sesion.
                            </p>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    
                  
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className=" fixed z-10 inset-0 overflow-y-auto"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <MailIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Subscripcion a Correos
                          </Dialog.Title>
                          <div className="mt-2 flex ">
                            <p className="text-sm text-gray-500 w-full">
                              Seguro que quiere Recibir Correos?
                            </p>
                          </div>
                          <p className="text-sm font-semibold"> {jobSearch}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => subcribirseNotificacionesEmail({ user })}
                      >
                        Si, deseo recibir correos
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        cancelar
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <div className="hero ">
            <div className="box pt-6">
              <div className="box-wrapper">
                <div className="bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                  {/* stroke-linecap="round" stroke-linejoin="round" */}
                  <button
                    onClick={() => submit()}
                    className="mx-3 flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  >
                    <svg
                      className="text-white w-5 text-gray-600 h-5 cursor-pointer"
                      fill="none"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                  <input
                    onChange={(e) => handle(e)}
                    value={jobSearch}
                    type="search"
                    name="jobSearch"
                    id="jobSearch"
                    placeholder="search for images"
                    x-model="q"
                    className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
                  />
                  {/* <div className="select">
                              <select name="" id="" x-model="image_type" className="text-sm outline-none focus:outline-none bg-transparent">
                                <option value="all" defaultValue>All</option>
                                <option value="photo">Photo</option>
                              </select>
                            </div> */}
                  {/* 
                  {user ? (
                    <button
                      onClick={() => confirmarSubscripcion({ user })}
                      disabled={hasJobs == false ? "disabled" : ""}
                      className="focus:outline-none disabled:opacity-60 mx-2 flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                      type="submit"
                    >
                      Subscribirse ofertas
                    </button>
                  ) : (
                    <div> </div>
                  )} */}
                  <button
                    onClick={() => confirmarSubscripcion({ user })}
                    disabled={hasJobs == false ? "disabled" : ""}
                    className="focus:outline-none disabled:opacity-60 mx-2 flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                  >
                    Subscribirse ofertas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Header /> */}
      <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
        <div className="lg:text-2xl md:text-xl text-lg lg:p-3 p-1 font-black text-gray-700">
          resultados de
          <span> {jobSearch == "" ? "desarrollador" : jobSearch}</span>
        </div>
      </div>

      <div className="grid p-16 justify-center items-center text-gray-900">
        {jobs.map((job, index) => (
          // <p key={index}>{job.company}</p>
          // <Cards key={index} info={job} indice={index} />

          <JobCard job={job} key={index} />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
