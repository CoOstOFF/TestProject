export default class Users {

    constructor(users = {}) {
        this.users = users;
    }

    checkName(name) {
        if (!name || this.users[name]) {
            return false;
        } else {
            this.users[name] = true;
            return true;
        }
    };

    getUserName() {
        var name,
            nextUserId = 1;

        do {
            name = 'User ' + nextUserId;
            nextUserId += 1;
        } while (!this.checkName(name));

        return name;
    };

    getUsers() {
        return this.users;
    };

    deleteUser(name) {
        if (this.users[name]) {
            delete this.users[name];
        }
    };
}