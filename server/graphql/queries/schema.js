import {GraphQLObjectType, GraphQLSchema, GraphQLList} from 'graphql';
import Employee from '../types/Employee';

const Query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        employees: {
            type: new GraphQLList(Employee),
            resolve: function () {
                return employees;
            }
        }
    })
});

var employees = [
    {_id: 1, name: "Bill", listNumber: 12},
    {_id: 2, name: "Kill", surname: "Dill"},
    {_id: 3, name: "Till", surname: "Dill", listNumber: 17},
    {_id: 4, name: "Mill", listNumber: 14},
    {_id: 5, name: "Rill", surname: "Dill"},
    {_id: 6, name: "Fill", surname: "Dill"}
];

const Schema = new GraphQLSchema({
    query: Query
});

export default Schema;