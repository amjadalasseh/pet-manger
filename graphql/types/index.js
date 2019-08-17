import { mergeTypes } from "merge-graphql-schemas";

import Owner from "./Owner/";


const typeDefs = [Owner];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export default mergeTypes(typeDefs, { all: true });
