import React from 'react';
import Alert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import EditTextForm from '../components/EditTextForm';
import {PageHeader} from 'react-bootstrap';

export default class ReduxContainer extends React.Component {
    render() {
        return (
            <div>
                <PageHeader style={{
                    marginLeft: '10px',
                    marginRight: '10px',
                    marginBottom: '10px'
                }}>
                    Query Editor
                    <small> SQL & GraphQL</small>
                </PageHeader>
                <Alert/>
                <Table/>
                <ProgressBar/>
                <EditTextForm/>
            </div>
        );
    }
}