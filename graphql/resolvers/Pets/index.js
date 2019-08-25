
import db from "../../../server/mod";
import isEmpty from "lodash.isempty";

export default {
  Query: {
    pets: async (parent, { type }, context, info) => {
      
      if (!isEmpty(context.data)) {
        return context.data
      }

      const petType = (!isEmpty(type)) ? `WHERE pets.petType="${type}" ` : "";
      const [rows, fields] = await db.sequelize.query(`SELECT pets.*, 
                                                        JSON_ARRAYAGG(JSON_OBJECT('catThings', cat.catThings)) AS catDetails, 
                                                        JSON_ARRAYAGG(JSON_OBJECT('dogThings', dog.dogThings)) AS dogDetails 
                                                        FROM pets 
                                                        LEFT JOIN cat on cat.petId = pets.id 
                                                        LEFT JOIN dog on dog.petId = pets.id 
                                                        ${petType}
                                                        group by pets.id `)
      return rows;
    }
  },
  Mutation: {
    createPet: async (parent, { pet }, context, info) => {

      if (!isEmpty(context.data)) {
        return context.data
      }
      try {
  
        let result = await db.sequelize.transaction(async (t) => {

          const { dataValues } = await db.pets.create({
            name: pet.name,
            color: pet.color,
            age: pet.age,
            breed: pet.breed,
            petType: pet.petType
          }, { transaction: t })
  
          switch (pet.petType) {
            case 'cat':
              await db.cat.create({
                petId: dataValues.id,
                catThings: pet.catDetails[0]
              }, { transaction: t })
              break;

            case 'dog':
              await db.dog.create({
                petId: dataValues.id,
                dogThings: pet.dogDetails[0]
              }, { transaction: t })
              break;

          }

          return dataValues;

        });

        return result
      } catch (err) {
        // Rollback transaction if any errors were encountered
        console.log(err);
        return err;

      }

    },
    updatePet: async (parent, { _id, PetDetails, type }, context, info) => {
     
      if (!isEmpty(context.data)) {
        return context.data
      }
      try {
        let result = await db.sequelize.transaction(async (t) => {

          if (!isEmpty(PetDetails)) {
            await db.pets.update({
              ...commonPetDetails
            }, { where: { id: _id } })
          }
          
          if (!isEmpty(PetDetails.dogDetails) && type === "dog") {
            await db.dog.update({
              ...PetDetails.dogDetails
            }, { where: { petId: _id } })
          }
          
          if (!isEmpty(PetDetails.catDetails) && type === "cat") {
            await db.cate.update({
              ...PetDetails.catDetails
            }, { where: { petId: _id } })
          }




        })
        return result
      } catch (err) {
        // Rollback transaction if any errors were encountered
        console.log(err);
        return err;

      }


    }
  }
};
