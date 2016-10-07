import {GraphQLObjectType, GraphQLString, GraphQLNonNull} from 'graphql';

const Workplace = new GraphQLObjectType({
    name: "Workplace",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLString)
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

