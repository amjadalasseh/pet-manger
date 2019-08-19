export default `
  interface Pets  {
    _id: String!
    name: String!
    color: String!
    age: Int!
    breed: String!
  }

  type Query {
    pet(_id: ID!): Pets!
    pets: [Pets!]!
  }


`;
