import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = "http://localhost:9000/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'network-only'
  //   },
  //   mutate: {
  //     fetchPolicy: 'network-only'
  //   },
  //   watchQuery: {
  //     fetchPolicy: 'network-only'
  //   }
  // }
});

export const JOBS_QUERY = gql`
  query {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

export const JOB_QUERY = gql`
  query ($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export const COMPANY_QUERY = gql`
query ($id: ID!) {
  company(id: $id) {
    id
    name
    description
    jobs {
      id
      title
    }
  }
}
`;

export async function createJob(input) {
  const mutation = gql`
    mutation ($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `;
  const variables = { input };
  const context = {
    headers: { Authorization: "Bearer " + getAccessToken() },
  };
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    context,
    update: (cache, result) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      });
    },
  });
  return job;
}