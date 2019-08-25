import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import resolvers from '../graphql/resolvers'
import types from '../graphql/types'

describe('list Pets', () => {
    const listPets = {
        id: '',
        query: `
        {pets{name,breed  }}
        `,
        variables: {},

        // Injecting the responses
        context: {
            data: [{
                id: 1,
                name: 'tttt',
                color: 'ttt',
                breed: 'ttt',
                age: '',
                petType: ''
            },
            {
                id: 2,
                name: 'tttt',
                color: 'ttt',
                breed: 'ttt',
                age: '',
                petType: ''
            },
            {
                id: 3,
                name: '545',
                color: '4545',
                breed: '4545',
                age: '',
                petType: ''
            }]
        },

        // Expected result
        expected: { "data": { "pets": [{ "breed": "ttt", "name": "tttt" }, { "breed": "ttt", "name": "tttt" }, { "breed": "4545", "name": "545" }] } }

    }
    const cases = [listPets]

    const schema = makeExecutableSchema({ typeDefs: types, resolvers })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj

        test(`query:`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })

})

describe('list Owners', () => {
    const listOwners = {
        id: '',
        query: `
        {owners{name petDetails{name} }}
        `,
        variables: {},

        // Injecting the responses
        context: {
            data: [
                {
                    id: 1,
                    name: 'owner',
                    address: 'owner address',
                    email: 'owner@email.com',
                    petDetails: [{ name: "cat1", type: "cat" }, { name: "dog1", type: "dog" }]
                },
                
                {
                    id: 2,
                    name: 'owner2',
                    address: 'owner2 address',
                    email: 'owner2@email.com',
                    petDetails: [{ name: "cat2", type: "cat" }, { name: "dog2", type: "dog" }]
                }
            ]
        },


        // Expected result
        expected:  {"data": {"owners": [{"name": "owner", "petDetails": [{"name": "cat1"}, {"name": "dog1"}]}, {"name": "owner2", "petDetails": [{"name": "cat2"}, {"name": "dog2"}]}]}}

    }
    const cases = [listOwners]

    const schema = makeExecutableSchema({ typeDefs: types, resolvers })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj

        test(`query:`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })

})

describe('list an owner', () => {
    const listOwners = {
        id: '',
        query: `
        {owners(id:"1"){name petDetails{name} }}
        `,
        variables: {},

        // Injecting the responses
        context: {
            data: [
                {
                    id: 1,
                    name: 'owner',
                    address: 'owner address',
                    email: 'owner@email.com',
                    petDetails: [{ name: "cat1", type: "cat" }, { name: "dog1", type: "dog" }]
                }
            ]
        },


        // Expected result
        expected:  {"data": {"owners": [{"name": "owner", "petDetails": [{"name": "cat1"}, {"name": "dog1"}]}]}}

    }
    const cases = [listOwners]

    const schema = makeExecutableSchema({ typeDefs: types, resolvers })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj

        test(`query:`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })

})


