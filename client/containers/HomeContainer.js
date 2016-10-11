import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, Panel} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

export default class HomeContainer extends React.Component {

    render() {
        return (
            <div>
                <Jumbotron style={{paddingLeft: 80, paddingRight: 80, paddingTop: 20, paddingBottom: 20}}>
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
                <Grid>
                    <Row className="show-grid">
                        <Col sm={6} md={3}>
                            <h1>GraphQL queries</h1>
                            <br/>
                            <p>Use GraphQL queries language to
                                get data from local database:</p>
                            <Panel>
                                <code>
                                    {'mutation\n' +
                                    '{\n' +
                                    'addWorkplace(_id: "id")\n' +
                                    '{\n' +
                                    '_id, name, address\n' +
                                    '}\n' +
                                    '}'}
                                </code>
                            </Panel>
                            <Panel>
                                <code>
                                    {'{\n' +
                                    'getEmployees{\n' +
                                    '_id, name, surname, listNumber\n' +
                                    '}\n' +
                                    '}'}
                                </code>
                            </Panel>
                        </Col>
                        <Col sm={6} md={3}>
                            <h1>SQL queries</h1>
                            <br/>
                            <p>Use SQL queries language to
                                get data from local database:</p>
                            <Panel>
                                <code>
                                    {'SELECT * FROM MYTABLE'}
                                </code>
                            </Panel>
                        </Col>
                        <Col sm={6} md={3}>
                            <h1>Relay technology</h1>
                            <br/>
                            <p>Get data from database using Relay technology.</p>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}