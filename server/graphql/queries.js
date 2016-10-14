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
    resolve: () => {
        return workplaces;
    }
};
