import React from 'react';
import {Link} from 'react-router';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Auth from '../Auth'

// let socket = io.connect();

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {key: 0};
    }

    componentDidMount = () => {

        Auth.removeSkipAuth();
        //     this.setState({socket: socket});
        //     socket.on('init', (data) => {
        //         let {users, name} = data;
        //         let usersList = [];
        //         for (let name in users) {
        //             if (users.hasOwnProperty(name)) usersList.push(name);
        //         }
        //         this.setState({users: usersList, user: name});
        //     });
        //     socket.on('user:joined', (data) => {
        //         let {users} = this.state;
        //         let {name} = data;
        //         users.push(name);
        //         this.setState({users: users});
        //         showNotification(this.capitalizeFirstLetter(name) + " joined project", "You can congratulate him or do nothing", null, "https://cdn4.iconfinder.com/data/icons/mayssam/512/add_user-48.png");
        //     });
        //     socket.on('user:left', (data) => {
        //         let {users} = this.state;
        //         let {name} = data;
        //         let index = users.indexOf(name);
        //         users.splice(index, 1);
        //         this.setState({users: users});
        //         showNotification(this.capitalizeFirstLetter(name) + " left project", "You can congratulate him or do nothing", null, "https://cdn4.iconfinder.com/data/icons/mayssam/512/remove_user-48.png");
        //     });
        //     socket.on('server:commit', (data) => {
        //         let {name} = data;
        //         showNotification(this.capitalizeFirstLetter(name) + " commited transaction", "You can congratulate him or do nothing", window.location, "https://cdn4.iconfinder.com/data/icons/miu/24/circle-arrow_up-upload-outline-stroke-48.png");
        //     });
        //     socket.on('server:kick', (data) => {
        //         let {name} = data;
        //         if (name == this.state.user) {
        //             showNotification("You were kicked!", "You can't do anything", null, "https://cdn4.iconfinder.com/data/icons/thefreeforty/30/thefreeforty_hand-48.png");
        //             this.setState({kick: true});
        //             socket.disconnect();
        //         }
        //     });
        //     if (prompt("Password for admin rights:", "") == "admin") {
        //         showNotification("You have admin rights", "You can do anything", null, "https://cdn4.iconfinder.com/data/icons/mayssam/512/star-48.png");
        //         this.setState({admin: true});
        //     }
    };

    handleSelect = (key) => {
        this.setState({key});
    };

    // capitalizeFirstLetter = (string) => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // };

    render() {
        // let {users} = this.state;
        // let menuItems = users.map((name) => {
        //     return (
        //         <MenuItem>{name}<Glyphicon style={(name == this.state.user || !this.state.admin) ? {display: "none"} : {
        //             marginLeft: 10,
        //             marginRight: 10,
        //             display: "inline"
        //         }} className="iconDeleteTableList" glyph="trash" onClick={() => {
        //             socket.emit("user:kick", {
        //                 name: name
        //             });
        //         }}/></MenuItem>
        //     )
        // });

        return (
            <div >
                <Navbar inverse fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Query App</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeKey={this.state.key} onSelect={this.handleSelect}>
                            <LinkContainer to="/redux">
                                <NavItem eventKey={1}>Query Editor</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/relay">
                                <NavItem eventKey={2}>User Table</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div style={{marginTop: 50}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
