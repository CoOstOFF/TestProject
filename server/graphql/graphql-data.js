const workplaces = [];

for (let i = 1; i <= 1000; i++) {
    workplaces.push(
        {
            id: generateUID(),
            name: "workplace " + i,
            address: "address " + i
        }
    );
}

const employees = [
    {
        id: generateUID(),
        name: "Bill",
        listNumber: 12,
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        id: generateUID(),
        name: "Kill",
        surname: "Dill",
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        id: generateUID(),
        name: "Till",
        surname: "Dill",
        listNumber: 17,
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        id: generateUID(),
        name: "Mill",
        listNumber: 14,
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        id: generateUID(),
        name: "Rill",
        surname: "Dill",
        workplace: workplaces[randomInteger(0, 3)]
    },
    {
        id: generateUID(),
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