import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

export default class HomeContainer extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron style={{paddingLeft: 80, paddingRight: 80}}>
                    <h1>Query App</h1>
                    <p>This is home page of my application. Please, check all features of this product.</p>
                    <LinkContainer to="redux">
                        <Button
                            id="submit_button"
                            bsStyle="primary"
                            type="button"
                            style={{
                                borderColor: "#222222",
                                backgroundColor: "#222222",
                                fontColor: "#888888"
                            }}>
                            Try Query Editor
                        </Button>
                    </LinkContainer>
                    <LinkContainer to="relay">
                        <Button
                            id="submit_button"
                            bsStyle="primary"
                            type="button"
                            style={{
                                marginLeft: 10,
                                borderColor: "#222222",
                                backgroundColor: "#222222",
                                fontColor: "#888888"
                            }}>
                            Try User Table
                        </Button>
                    </LinkContainer>
                </Jumbotron>
            </div>
        );
    }
}