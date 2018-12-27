const queries = `
  user ( id: String! ): user 
  me: user 
`;

const mutations = `

  register (
    userId: String
    userName: String!
    password: String!
    role: UserRole!
  ): Token


  login (
    userId: String!
    password: String!
  ): Token
    
`;

const userSchemaDefs = {
  mutations,
  queries,
};

export default userSchemaDefs;
