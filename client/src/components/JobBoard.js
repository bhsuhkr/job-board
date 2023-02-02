import JobList from "./JobList";
import { getJobs } from "../graphql/queries";
import { useEffect, useState } from "react";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    console.log("mounted"); // runs second, run only onces
    getJobs().then(setJobs);
  }, []);

  console.log("[job]", jobs); //runs first, runs third: render again after getJobs() runs

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
