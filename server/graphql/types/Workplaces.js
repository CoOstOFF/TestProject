import {GraphQLObjectType, GraphQLList} from 'graphql'
import Workplace from './Workplace'

const Workplaces = new GraphQLObjectType({
    name: 'Workplaces',
    fields: () => ({
        workplaces: {type: new GraphQLList(Workplace)},
    }),
});

export default Workplaces