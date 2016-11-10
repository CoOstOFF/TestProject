import React from 'react';
import {Link} from 'react-router';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

var socket = io.connect();

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {key: 0, users: []};
    }

    componentDidMount = () => {
        socket.on('init', (data) => {
            let {users, name} = data;
            let usersList = [];
            for (let name in users) {
                if (users.hasOwnProperty(name)) usersList.push(name);
            }
            this.setState({users: usersList, user: name});
        });
        socket.on('user:joined', (data) => {
            let {users} = this.state;
            let {name} = data;
            users.push(name);
            this.setState({users: users});
        });
        socket.on('user:left', (data) => {
            let {users} = this.state;
            let {name} = data;
            let index = users.indexOf(name);
            users.splice(index, 1);
            this.setState({users: users});
        });
    };

    handleSelect = (key) => {
        this.setState({key});
    };

    render() {
        let {users} = this.state;
        let menuItems = users.map((name) => {
            return (
                <MenuItem>{name}</MenuItem>
            )
        });

        return (
            <div>
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
                        <Nav pullRight>
                            <Navbar.Text>
                                You are {this.state.user}
                            </Navbar.Text>
                            <NavDropdown id="navDropDown" eventKey={1}
                                         title={"Show Users " + "(" + this.state.users.length + ")"}>
                                {menuItems}
                            </NavDropdown>
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
