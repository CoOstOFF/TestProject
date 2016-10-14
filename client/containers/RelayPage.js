import React from 'react';
import Alert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';
import RelayTable from '../components/RelayTable'
import {PageHeader} from 'react-bootstrap';

export default class RelayPage extends React.Component {
    render() {
        return (
            <div>
                <PageHeader style={{
                    paddingTop: 20,
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    User Table
                    <small> Using Relay technology</small>
                </PageHeader>
                <Alert/>
                {RelayTable}
                <ProgressBar/>
            </div>
        );
    }
}
