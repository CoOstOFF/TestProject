import React from 'react'
import {Grid, Row, Col, Panel} from 'react-bootstrap';

export default class HomePage extends React.Component {

    render() {
        let imgUrl = "http://static.tumblr.com/43467ee80971d8a4e52f15fd80a50539/nvi0dip/QCwnybas4/tumblr_static_afdblu9pkhkwosgckkcsocc4.jpg";
        return (
            <div>
                <div style={{
                    width: "100%",
                    height: "100%",
                    bottom: 0,
                    filter: "grayscale(50%)",
                    position: "absolute",
                    background: 'url(' + imgUrl + ') no-repeat center center fixed',
                    backgroundSize: "cover"
                }}/>
                <div style={{
                    width: "100%",
                    height: "100%",
                    bottom: 0,
                    position: "absolute",
                }}>
                    <div style={{
                        height: "45%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <span style={{color: "#FFFFFF", fontSize: 80, marginTop: 50}}>QUERY APP</span>
                    </div>
                    <div className="topShadow" style={{
                        height: "55%",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "#FFFFFF",
                        alignItems: "center"
                    }}>
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
                </div>
            </div>
        )
    }
}