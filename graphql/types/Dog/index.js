export default `
  type Dog implements Pets{
    _id: String!
    name: String!
    color: String!
    age: Int!
    breed: String!
  }

  type Query {
    dog(_id: ID!): Dog!
    dogs: [Dog!]!
  }

  type Mutation {
    createDog(dog: CreateDogInput): Dog!
    updateDog(_id: String!, dog: UpdateDogInput!): Dog!
    deleteDog(_id: String!): Dog!
  }

  input CreateDogInput {
    name: String!
    color: String!
    age: String!
    breed: String!
  }
  
  input UpdateDogInput {
    name: String!
    color: String!
    age: String!
    breed: String!
  } 
`;
