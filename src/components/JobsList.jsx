import React, { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";

// import Header from "./Header";
import JobCard from "./JobCard";
// import lista from "../data/information";
// import lista from "../data/information";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  const ListDataJobs = () => {
    useGetData({
      url: `getJobs?trabajo=android`,
    }).then((data) => {
      setJobs(data);
      // console.table(data);
      console.log(data);
    });
  };
  useEffect(() => {
    ListDataJobs();
    // console.log(jobs);
  }, []);
  return (
    <div>
      {/* <Header /> */}

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
