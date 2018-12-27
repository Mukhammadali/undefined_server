const userTypeDefs = `
 enum UserRole {
  provider
  student
 }

  type Token {
    jwt: String!
  }
  

  type user {
    id: ID!
    userId: String!
    userName: String!
    role: String!
    createdDate: String!
  }
`;

export default userTypeDefs;
