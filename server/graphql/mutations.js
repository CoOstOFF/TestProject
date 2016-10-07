import {GraphQLInt, GraphQLList, GraphQLString, GraphQLNonNull} from 'graphql';
import Employee from './types/Employee';
import Workplace from './types/Workplace';
import {employees, workplaces} from './graphql-data';

export const addWorkplace = {
    type: new GraphQLList(Workplace),
    args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        address: {type: GraphQLString}
    },
    resolve: (parent, args) => {
        if (args._id) {
            workplaces.push({
                _id: args._id,
                name: args.name,
                address: args.address
            });
            return workplaces;
        }
    }
};

export const deleteWorkplace = {
    type: new GraphQLList(Workplace),
    args: {
        _id: {type: GraphQLString}
    },
    resolve: (parent, args) => {
        for (let i = workplaces.length - 1; i >= 0; i--) {
            if (workplaces[i]._id == args._id) {
                workplaces.remove(i);
            }
        }
        return workplaces;
    }
};

export const addEmployee = {
    type: new GraphQLList(Employee),
    args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        listNumber: {type: GraphQLInt}
    },
    resolve: (parent, args) => {
        if (args._id) {
            employees.push({
                _id: args._id,
                name: args.name,
                surname: args.surname,
                listNumber: args.listNumber
            });
            return employees;
        }
    }
};

export const deleteEmployee = {
    type: new GraphQLList(Employee),
    args: {
        _id: {type: GraphQLString}
    },
    resolve: (parent, args) => {
        for (let i = employees.length - 1; i >= 0; i--) {
            if (employees[i]._id == args._id) {
                employees.remove(i);
            }
        }
        return employees;
    }
};

// remove elements from array
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
