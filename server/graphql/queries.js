import {GraphQLList} from 'graphql';
import Employee from './types/Employee';
import Workplace from './types/Workplace';
import Lists from './types/Lists';
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

export const getWorkplacesRelay = {
    type: Lists,
    resolve: () => {
        return workplaces;
    }
};