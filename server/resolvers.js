import { Job, Company } from './db.js'

export const resolvers = {
    Query: {
        jobs: () => Job.findAll()
    },

    Job: {
        company: (job) => Company.findById(job.companyId)
    }
};