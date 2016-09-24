import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

export default class HeaderNavigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar inverse staticTop >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>SQL Query App</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}