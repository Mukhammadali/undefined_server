const studentTypeDefs = `

  type Token {
    jwt: String!
  }
  

  type Student {
    id: ID!
    studentId: String!
    studentName: String!
    createdDate: String!
  }
`;

export default studentTypeDefs;
