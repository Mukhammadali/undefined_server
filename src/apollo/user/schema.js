const queries = `
  user ( id: String! ): User 
  me: User 
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

  toggleUserCreated: User
    
`;

const userSchemaDefs = {
  mutations,
  queries,
};

export default userSchemaDefs;
