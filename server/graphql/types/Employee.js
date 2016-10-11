import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID} from 'graphql';
import Workplace from './Workplace';

const Employee = new GraphQLObjectType({
    name: "Employee",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        surname: {
            type: GraphQLString
        },
        listNumber: {
            type: GraphQLInt
        },
        workplace: {
            type: Workplace
        }
    }
});

export default Employee;
