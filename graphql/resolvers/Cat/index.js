import Cat from "../../../server/models/Cat";

export default {
  Query: {
    cat: async (parent, { _id }, context, info) => {
      return await Cat.findOne({ _id }).exec();
    },
    cats: async (parent, args, context, info) => {
      const cats = await Cat.find({})
        .populate()
        .exec();

      return cats.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        color: u.color,
        age: u.age,
        breed: u.breed
      }));
    }
  },
  Mutation: {
    createCat: async (parent, { cat }, context, info) => {
      const newCat = await new Cat({
        name: cat.name,
        color: cat.color,
        age: cat.age,
        breed: cat.breed
      });
      return new Promise((resolve, reject) => {
        newCat.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateCat: async (parent, { _id, cat }, context, info) => {
      return new Promise((resolve, reject) => {
        Cat.findByIdAndUpdate(_id, { $set: { ...cat } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteCat: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Cat.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
