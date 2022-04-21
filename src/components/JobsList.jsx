import React, { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";

// import Header from "./Header";
import JobCard from "./JobCard";
// import lista from "../data/information";
// import lista from "../data/information";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [jobSearch, setJobSearch] = useState(['Desarrollador Web']);

  const ListDataJobs = (jobSearchArg='desarrollador') => {

    
    if(jobSearch!=null)
      jobSearchArg=jobSearch

    useGetData({
      url: `getJobs?trabajo=${jobSearchArg}`,
    }).then((data) => {
      setJobs(data);
      // console.table(data);
      console.log(data);
    });
  };

  const handle = (e)=>{
    const ofertVa = e.target.value
    setJobSearch(ofertVa)
    console.log(ofertVa)
  }
  const submit = ()=>{
    // const ofertVa = e.target.value
    ListDataJobs()
    // console.log("submit:",ofertVa)
    
  }

  useEffect(() => {
    ListDataJobs();
    // console.log(jobs);
  }, []);
  return (
    <div>

      {/* <!-- image search box --> */}
      <div className="main">
          <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          <div className="hero">
                  <div className="box pt-6">
                      <div className="box-wrapper">

                          <div className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                          {/* stroke-linecap="round" stroke-linejoin="round" */}
                            <button onClick={()=>submit()} className="outline-none focus:outline-none"><svg className=" w-5 text-gray-600 h-5 cursor-pointer" fill="none"  strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                            <input onChange={(e)=> handle(e)} value={jobSearch} type="search" name="jobSearch" id="jobSearch" placeholder="search for images" x-model="q" className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent" />
                            <div className="select">
                              <select name="" id="" x-model="image_type" className="text-sm outline-none focus:outline-none bg-transparent">
                                <option value="all" defaultValue>All</option>
                                <option value="photo">Photo</option>
                              </select>
                            </div>
                          </div>
                        
                      </div>
                  </div>
                  </div>
            </div>
      </div>
      {/* <Header /> */}
      <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
      <div className="lg:text-2xl md:text-xl text-lg lg:p-3 p-1 font-black text-gray-700">
        resultados de <span>{jobSearch==''?'desarrollador':jobSearch }</span></div>
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
