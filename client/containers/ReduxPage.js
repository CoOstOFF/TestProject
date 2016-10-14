import React from 'react';
import Alert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import EditTextForm from '../components/EditTextForm';
import {PageHeader} from 'react-bootstrap';

export default class ReduxPage extends React.Component {
    render() {
        return (
            <div>
                <PageHeader style={{
                    paddingTop: 20,
                    marginLeft: 10,
                    marginRight: 10
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