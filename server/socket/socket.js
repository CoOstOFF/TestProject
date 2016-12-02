// import Users from './Users';
//
// let users = new Users();
//
// const socket = (socket) => {
//
//     let name = users.addUser();
//
//     socket.emit('init', {
//         name: name,
//         users: users.getUsers()
//     });
//
//     socket.broadcast.emit('user:joined', {
//         name: name
//     });
//
//     socket.on('user:commit', (data) => {
//         socket.broadcast.emit('server:commit', {name: data.name})
//     });
//
//     socket.on('user:kick', (data) => {
//         socket.broadcast.emit('server:kick', {name: data.name})
//     });
//
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user:left', {
//             name: name
//         });
//         users.deleteUser(name);
//     });
// };
//
// export default socket;