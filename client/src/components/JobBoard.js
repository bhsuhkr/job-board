import JobList from "./JobList";
import { JOBS_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

function useJobs() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: 'network-only'
  });
  return {
    jobs: data?.jobs,
    loading,
    error: Boolean(error)
  }
}

function JobBoard() {
  const { jobs, loading, error} = useJobs();
  
  console.log("[job]", { jobs, loading, error }); //runs first, runs third: render again after getJobs() runs

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry, something went wrong.</p>;
  }


  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
