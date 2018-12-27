const queries = `
  student ( id: String! ): Student 
  me: Student 
`;

const mutations = `

  register (
    studentId: String
    studentName: String!
    password: String!
  ): Token


  login (
    studentId: String!
    password: String!
  ): Token
    
`;

const studentSchemaDefs = {
  mutations,
  queries,
};

export default studentSchemaDefs;
