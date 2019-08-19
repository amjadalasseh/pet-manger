import Owner from "../../../server/models/Owner";

export default {
  Query: {
    owner: async (parent, { _id }, context, info) => {
      return await Owner.findOne({ _id }).exec();
    },
    owners: async (parent, args, context, info) => {
      const owners = await Owner.find({})
        .populate()
        .exec();

      return owners.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        email: u.email,
        phone: u.phone,
        address: u.address
      }));
    }
  },
  Mutation: {
    createOwner: async (parent, { owner }, context, info) => {
      const newOwner = await new Owner({
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
        address: owner.address
      });
      return new Promise((resolve, reject) => {
        newOwner.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateOwner: async (parent, { _id, owner, pets}, context, info) => {
      console.log('pets==>',pets[0])
      console.log('owner==>',owner)
      return new Promise((resolve, reject) => {
        Owner.findByIdAndUpdate(_id, { $set: { ...owner, pets:{name:"test"} } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteOwner: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Owner.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
