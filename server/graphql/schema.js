import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import * as Mutations from './mutations';
import * as Queries from './queries';

const Query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        getEmployees: Queries.getEmployees,
        getWorkplaces: Queries.getWorkplaces
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addWorkplace: Mutations.addWorkplace,
        deleteWorkplace: Mutations.deleteWorkplace,
        addEmployee: Mutations.addEmployee,
        deleteEmployee: Mutations.deleteEmployee
    }),
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;