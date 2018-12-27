import studentSchemaDefs from './student/schema';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const allTypeDefs = `
${typeDefs}
type Query {
  ${studentSchemaDefs.queries}
}

type Mutation {
  ${studentSchemaDefs.mutations}

}

`;

const schema = {
  typeDefs: allTypeDefs,
  resolvers,
};

export default schema;
