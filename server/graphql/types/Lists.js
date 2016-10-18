import {GraphQLObjectType, GraphQLList, GraphQLInt} from 'graphql';
import Workplace from './Workplace';
import {workplaces} from '../graphql-data';

const Lists = new GraphQLObjectType({
    name: 'Lists',
    fields: {
        workplaces: {
            type: new GraphQLList(Workplace),
            args: {first: {type: GraphQLInt}},
            resolve: (root, args) => {
                if (args.first == null) args.first = workplaces.length;
                return workplaces.slice(0, args.first);
            }
        }
    }
});


export default Lists;