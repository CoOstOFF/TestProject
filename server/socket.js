import Users from './Users';

let users = new Users();

const socket = (socket) => {

    let name = users.getUserName();

    socket.emit('init', {
        name: name,
        users: users.getUsers()
    });

    socket.broadcast.emit('user:joined', {
        name: name
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', {
            name: name
        });
        users.deleteUser(name);
    });
};

export default socket;