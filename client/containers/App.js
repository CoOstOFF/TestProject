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
                    </Navbar.Collapse>
                </Navbar>
                <div style={{marginTop: 50, marginBottom: 50}}>
                    {this.props.children}
                </div>
                <Navbar inverse fixedBottom style={{textAlign: "center"}}>
                    <Navbar.Text>
                        Copyright &#169; 2016 Andilevko Andrew
                    </Navbar.Text>
                </Navbar>
            </div>
        )
    }
}