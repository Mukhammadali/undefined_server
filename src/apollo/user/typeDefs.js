const userTypeDefs = `
 enum UserRole {
  provider
  student
 }

  type Token {
    jwt: String!
  }
  

  type User {
    id: ID!
    userId: String!
    userName: String!
    role: String!
    createdDate: String!
    isUserCreated: Boolean!
  }
`;

export default userTypeDefs;
