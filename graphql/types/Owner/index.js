
export default `
  type Owner {
    _id: String!
    name: String!
    email: String!
    phone: Int!
    address: String!
    pets: [Pets]
  }

  type Query {
    owner(_id: ID!): Owner!
    owners: [Owner!]!
  }

  type Mutation {
    createOwner(owner: CreateOwnerInput): Owner!
    updateOwner(_id: String!, owner: UpdateOwnerInput!, pets:[UpdatePetInput]): Owner!
    
    deleteOwner(_id: String!): Owner!
  }

  input CreateOwnerInput {
    name: String!
    email: String!
    phone: Int!
    address: String!
  }
  
  input UpdateOwnerInput {
    name: String!
    email: String!
    phone: Int!
    address: String!
    
  } 

  input UpdatePetInput {
    _id: String
    name: String
    breed: String
    age: Int
   
  } 


`;
