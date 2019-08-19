import mongoose from "mongoose";
import { ObjectID } from "mongodb";
const extendSchema = require('mongoose-extend-schema');
import PetsSchema from './Pets'

// const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const CatSchema = extendSchema(PetsSchema, {
  phone: {type: String, required: false}
});


// const CatSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   color: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   },
//   breed: {
//     type: String,
//     required: true
//   }
// });

export default mongoose.model("Cat", CatSchema);


