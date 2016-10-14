import {GraphQLObjectType, GraphQLList} from 'graphql'
import Employee from './Employee'

const Employees = new GraphQLObjectType({
    name: 'Employees',
    fields: () => ({
        employees: {type: new GraphQLList(Employee)},
    }),
});

export default Employees