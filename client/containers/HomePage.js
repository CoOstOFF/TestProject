import React from 'react';
import {Jumbotron, Grid, Row, Col, Panel, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron
                    style={{textAlign: "center", paddingLeft: 10, paddingRight: 10}}>
                    <h1>Query App</h1>
                    <p>This is home page of my application. Please, check all features of this product.</p>
                    <LinkContainer to="redux">
                        <Button
                            bsStyle="primary"
                            type="button"
                            style={{
                                borderColor: "#222222",
                                backgroundColor: "#222222",
                                fontColor: "#888888",
                            }}>
                            Try Query Editor
                        </Button>
                    </LinkContainer>
                    <LinkContainer to="relay">
                        <Button
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
                        <Col sm={7} md={4} style={{textAlign: "center"}}>
                            <h1 style={{textAlign: "center"}}>GraphQL queries</h1>
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
                        <Col sm={7} md={4} style={{textAlign: "center"}}>
                            <h1 style={{textAlign: "center"}}>SQL queries</h1>
                            <br/>
                            <p>Use SQL queries language to
                                get data from local database:</p>
                            <Panel>
                                <code>
                                    {'SELECT LAT_N, CITY, TEMP_F ' +
                                    'FROM STATS, STATION ' +
                                    'WHERE MONTH = 7 ' +
                                    'AND STATS.ID = STATION.ID ' +
                                    'ORDER BY TEMP_F'}
                                </code>
                            </Panel>
                        </Col>
                        <Col sm={7} md={4} style={{textAlign: "center"}}>
                            <h1>Relay technology</h1>
                            <br/>
                            <p>
                                Relay is a new framework from Facebook that
                                provides data-fetching functionality for React
                                applications.
                            </p>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}