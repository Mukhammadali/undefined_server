import userResolvers from './user/resolvers';

const resolvers = {
  Query: {
    ...userResolvers.queries,
  },

  Mutation: {
    ...userResolvers.mutations,
  },
};

export default resolvers;
