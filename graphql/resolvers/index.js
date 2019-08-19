import { mergeResolvers } from "merge-graphql-schemas";

import Owner from "./Owner/";
import Cat from "./Cat/";
import Dog from "./Dog/";

const resolvers = [Owner, Cat, Dog];

export default mergeResolvers(resolvers);
