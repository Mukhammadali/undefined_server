import userSchemaDefs from './user/schema';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const allTypeDefs = `
${typeDefs}
type Query {
  ${userSchemaDefs.queries}
}

type Mutation {
  ${userSchemaDefs.mutations}

}

`;

const schema = {
  typeDefs: allTypeDefs,
  resolvers,
};

export default schema;
