import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull} from 'graphql';

const Employee = new GraphQLObjectType({
    name: "Employee",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (employee) => {
                return employee.name || "Does not exist";
            }
        },
        surname: {
            type: GraphQLString,
            resolve: (employee) => {
                return employee.surname || "Does not exist";
            }
        },
        listNumber: {
            type: GraphQLInt,
            resolve: (employee) => {
                return employee.listNumber || null;
            }
        }
    }
});

export default Employee;
