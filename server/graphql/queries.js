import {GraphQLList, GraphQLString} from 'graphql';
import Employee from './types/Employee';
import Workplace from './types/Workplace';
import {employees, workplaces} from './graphql-data';

export const getEmployees = {
    type: new GraphQLList(Employee),
    resolve: () => {
        return employees;
    }
};

export const getWorkplaces = {
    type: new GraphQLList(Workplace),
    args: {
        name: {
            type: GraphQLString
        }
    },
    resolve: (parent, args) => {
        if (args.name) {
            let result = [];
            result.push(workplaces.find((element, index, array) => {
                return element.name == args.name;
            }));
            return result;
        }
        return workplaces;
    }
};
