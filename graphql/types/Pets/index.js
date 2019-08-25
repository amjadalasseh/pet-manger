export default `
enum PetsTypes  {
  cat 
  dog 
}
  type Pets {
    id: String!
    name: String
    color: String
    age: String
    breed: String
    catDetails: [Cat]
    dogDetails: [Dog]
    petType: PetsTypes
    
  }

  type Query {
    pets(type:String): [Pets!]!
  }
  
  type Mutation {
    createPet(pet: CreatePetInput): Pets!
    updatePet(_id:String!, petsDetails:UpdatePetInput , type:PetsTypes ): Pets
  }
  
  input CreatePetInput {
    name: String!
    color: String!
    age: String!
    breed: String!
    petType: PetsTypes
    catDetails: [cat]
    dogDetails: [dog]
  }
  
  input UpdatePetInput {

    name: String
    color: String
    age: String
    breed: String
  
  }
  
  input cat {

    petId: String
    catThings: String!
   
  }
  
  input dog {
    
    petId: String
    dogThings: String!
   
  }


`;
