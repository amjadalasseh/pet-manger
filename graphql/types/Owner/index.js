export default `
  type Owner {
    id: String!
    name: String!
    email: String!
    phone: Int!
    address: String!
    petsId:  String!
    petDetails: [Pets]
  }

  type Query {
    owners(id:String): [Owner!]!
  }
`;
