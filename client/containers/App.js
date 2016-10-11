import React from 'react';
import {Link} from 'react-router';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {key: 0};
    }

    handleSelect = (key) => {
        this.setState({key});
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <Navbar inverse staticTop style={{marginBottom: 0}}>
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
                {this.props.children}
            </div>
        )
    }
}