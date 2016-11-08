import React from 'react';
import Alert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import EditTextForm from '../components/EditTextForm';
import {Glyphicon} from 'react-bootstrap';
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
                        <Glyphicon glyph="remove"/>
                    </Button>
                    <Button
                        type="button"
                        style={{backgroundColor: "#EFEFEF", borderColor: "#EEEEEE", fontWeight: "bold", float: "left"}}
                        onClick={this.props.onTurnClick}
                        bsSize="xsmall">
                        <Glyphicon glyph="option-horizontal"/>
                    </Button>
                    <span>Form №{this.props.num.toString()}</span>
                </div>
                <div style={{margin: 10}}>
                    <Alert error={this.props.error} num={this.props.num}/>
                    <ProgressBar/>
                    <Table data={this.props.data}/>
                    <EditTextForm num={this.props.num}/>
                </div>
            </div>
        );
    }
}