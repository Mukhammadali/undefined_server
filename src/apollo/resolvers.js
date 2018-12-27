import studentResolvers from './student/resolvers';

const resolvers = {
  Query: {
    ...studentResolvers.queries,
  },

  Mutation: {
    ...studentResolvers.mutations,
  },
};

export default resolvers;
