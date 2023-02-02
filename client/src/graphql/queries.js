import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql";

export async function getJob(id) {
    const query = gql`
        query($id: ID!) {
        job(id: $id) {
            id,
            title
            company {
            id
            name
            }
            description
        }
        }
    `;
    const variables = { id };
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
  }
  

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const { jobs } = await request(GRAPHQL_URL, query);
  return jobs;
}
