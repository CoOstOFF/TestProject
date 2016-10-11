import React from 'react';
import Alert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import {PageHeader} from 'react-bootstrap';

export default class RelayContainer extends React.Component {
    render() {
        return (
            <div>
                <PageHeader style={{
                    marginLeft: '10px',
                    marginRight: '10px',
                    marginBottom: '10px'
                }}>
                    User Table
                    <small> Using Relay technology</small>
                </PageHeader>
                <Alert/>
                <Table/>
                <ProgressBar/>
            </div>
        );
    }
}
