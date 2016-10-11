const workplaces = [
    {
        _id: generateUID(),
        name: "Burger King",
        address: "F street"
    },
    {
        _id: generateUID(),
        name: "KFC",
        address: "T street"
    },
    {
        _id: generateUID(),
        name: "McDonald's",
        address: "D street"
    },
    {
        _id: generateUID(),
        name: "Sbarro",
        address: "V street"
    }
];

const employees = [
    {
        _id: generateUID(),
        name: "Bill",
        listNumber: 12,
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        _id: generateUID(),
        name: "Kill",
        surname: "Dill",
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        _id: generateUID(),
        name: "Till",
        surname: "Dill",
        listNumber: 17,
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        _id: generateUID(),
        name: "Mill",
        listNumber: 14,
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        _id: generateUID(),
        name: "Rill",
        surname: "Dill",
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        _id: generateUID(),
        name: "Fill",
        surname: "Dill",
        workplace: workplaces[randomInteger(0, 3)]
    }
];

function generateUID() {
    return Math.random().toString(36).substr(2, 9);
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

export {employees, workplaces};