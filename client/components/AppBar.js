import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

export default class MyAppBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar inverse staticTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>Query App</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}