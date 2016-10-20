import {employees, workplaces} from './graphql-data';
import {
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
    connectionDefinitions,
    connectionArgs,
    connectionFromArray
} from 'graphql-relay'
import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} from 'graphql';

var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        var {type, id} = fromGlobalId(globalId);
        if (type === 'Lists') {
            return workplaces;
        }
        return null;
    },
    (obj) => {
        return Lists;
    }
);

const Workplace = new GraphQLObjectType({
    name: 'Workplace',
    fields: () => ({
        id: globalIdField(),
        name: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        }
    }),
    interfaces: [nodeInterface]
});

const Employee = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: {
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
    })
});

var {connectionType: workplaceConnection} =
    connectionDefinitions({nodeType: Workplace});

const Lists = new GraphQLObjectType({
    name: 'Lists',
    fields: () => ({
        id: globalIdField(),
        workplaces: {
            type: workplaceConnection,
            args: connectionArgs,
            resolve: (root, args) => connectionFromArray(workplaces, args)
        }
    }),
    interfaces: [nodeInterface]
});

const getEmployees = {
    type: new GraphQLList(Employee),
    resolve: () => {
        return employees;
    }
};

const getWorkplaces = {
    type: new GraphQLList(Workplace),
    resolve: () => {
        return workplaces;
    }
};

const getWorkplacesRelay = {
    type: Lists,
    resolve: () => {
        return workplaces;
    }
};

const addWorkplace = {
    type: new GraphQLList(Workplace),
    args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        address: {type: GraphQLString}
    },
    resolve: (parent, args) => {
        if (args.id) {
            workplaces.push({
                id: args.id,
                name: args.name,
                address: args.address
            });
            return workplaces;
        }
    }
};

const deleteWorkplace = {
    type: new GraphQLList(Workplace),
    args: {
        id: {type: GraphQLString}
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

const addEmployee = {
    type: new GraphQLList(Employee),
    args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        listNumber: {type: GraphQLInt}
    },
    resolve: (parent, args) => {
        if (args.id) {
            employees.push({
                id: args.id,
                name: args.name,
                surname: args.surname,
                listNumber: args.listNumber
            });
            return employees;
        }
    }
};

const deleteEmployee = {
    type: new GraphQLList(Employee),
    args: {
        id: {type: GraphQLString}
    },
    resolve: (parent, args) => {
        for (let i = employees.length - 1; i >= 0; i--) {
            if (employees[i].id == args.id) {
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

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        getWorkplacesRelay: getWorkplacesRelay,
        getEmployees: getEmployees,
        getWorkplaces: getWorkplaces
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addWorkplace: addWorkplace,
        deleteWorkplace: deleteWorkplace,
        addEmployee: addEmployee,
        deleteEmployee: deleteEmployee
    }),
});

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation
});