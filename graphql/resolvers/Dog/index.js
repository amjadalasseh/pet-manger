import Dog from "../../../server/models/Dog";

export default {
  Query: {
    dog: async (parent, { _id }, context, info) => {
      return await Dog.findOne({ _id }).exec();
    },
    dogs: async (parent, args, context, info) => {
      const dogs = await Dog.find({})
        .populate()
        .exec();

      return dogs.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        color: u.color,
        age: u.age,
        breed: u.breed
      }));
    }
  },
  Mutation: {
    createDog: async (parent, { dog }, context, info) => {
      const newDog = await new Dog({
        name: dog.name,
        color: dog.color,
        age: dog.age,
        breed: dog.breed
      });
      return new Promise((resolve, reject) => {
        newDog.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateDog: async (parent, { _id, dog }, context, info) => {
      return new Promise((resolve, reject) => {
        Dog.findByIdAndUpdate(_id, { $set: { ...dog } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteDog: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Dog.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
