import {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID} from 'graphql';

const Workplace = new GraphQLObjectType({
    name: "Workplace",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        }
    }
});

export default Workplace;

