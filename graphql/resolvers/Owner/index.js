
import db from "../../../server/mod/";
import isEmpty from "lodash.isempty";

export default {
  Query: {
    owners: async (parent, {id}, context, info) => {
    
      if (!isEmpty(context.data)) {
        return context.data
      }
      const ownerId= (!isEmpty(id))? `WHERE owner.id="${id}" `:"";
    
      const [rows, fields] = await db.sequelize.query(`SELECT owner.*,
                                                       JSON_ARRAYAGG(JSON_OBJECT('name', pets.name,'petType', pets.petType)) AS petDetails
                                                       FROM owner 
                                                       left JOIN ownerpets on ownerpets.ownerId = owner.id 
                                                       left JOIN pets on ownerpets.petId = pets.id 
                                                       ${ownerId}
                                                       GROUP by owner.id
                                                       ` ) 
                                                       
        console.log('rows==>',rows)
      return rows;
    }
  },

};
