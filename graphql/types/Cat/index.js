export default `
  type Cat implements Pets{
    _id: String!
    name: String!
    color: String!
    age: Int!
    breed: String!
  }

  type Query {
    cat(_id: ID!): Cat!
    cats: [Cat!]!
  }

  type Mutation {
    createCat(cat: CreateCatInput): Cat!
    updateCat(_id: String!, cat: UpdateCatInput!): Cat!
    deleteCat(_id: String!): Cat!
  }

  input CreateCatInput {
    name: String!
    color: String!
    age: Int!
    breed: String!
  }
  
  input UpdateCatInput {
    name: String!
    color: String!
    age: Int!
    breed: String!
  } 
`;
