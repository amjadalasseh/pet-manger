import { mergeResolvers } from "merge-graphql-schemas";

import Owner from "./Owner/";


const resolvers = [Owner];

export default mergeResolvers(resolvers);
