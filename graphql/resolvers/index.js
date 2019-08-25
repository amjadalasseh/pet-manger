import { mergeResolvers } from "merge-graphql-schemas";

import Owner from "./Owner/";
import Pets from "./Pets/";

const resolvers = [Owner,Pets];

export default mergeResolvers(resolvers);
