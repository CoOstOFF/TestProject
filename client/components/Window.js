import React from 'react';
import Alert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import EditTextForm from '../components/EditTextForm';
import {Button} from 'react-bootstrap';

export default class Window extends React.Component {

    render() {
        return (
            <div>
                <div style={{
                    borderBottom: "solid 3px #E2E1E0",
                    backgroundColor: "#EFEFEF",
                    padding: 2,
                    textAlign: "center",
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3
                }}>
                    <Button
                        type="button"
                        style={{backgroundColor: "#EFEFEF", borderColor: "#EEEEEE", fontWeight: "bold", float: "left"}}
                        onClick={this.props.onCloseClick}
                        bsSize="xsmall">
                        x
                    </Button>
                    <span>Form №{this.props.num.toString()}</span>
                </div>
                <div style={{margin: 10}}>
                    <Alert/>
                    <ProgressBar/>
                    <Table/>
                    <EditTextForm/>
                </div>
            </div>
        );
    }
}