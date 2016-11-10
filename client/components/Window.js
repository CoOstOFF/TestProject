import React from 'react';
import Alert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import EditTextForm from '../components/EditTextForm';
import {Glyphicon} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export default class Window extends React.Component {

    constructor(props) {
        super(props);

        this.state = {showInput: true}
    }

    toggleShowInput = () => {
        this.setState({showInput: !this.state.showInput})
    };

    render() {
        return (
            <div>
                <div style={{
                    backgroundColor: "#757575",
                    padding: 2,
                    textAlign: "left",
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2
                }}>
                    <Glyphicon className="iconBarWindow" onClick={this.props.onCloseClick} glyph="remove"/>
                    <Glyphicon className="iconBarWindow" onClick={this.props.onTurnClick} glyph="option-horizontal"/>
                    <span style={{
                        color: "#FFFFFF",
                        fontSize: 15,
                        marginLeft: 10
                    }}>Form {this.props.num.toString()}</span>
                </div>
                <div style={{margin: 10}}>
                    <Alert error={this.props.error} num={this.props.num}/>
                    <ProgressBar/>
                    <Table data={this.props.data}/>
                    <Glyphicon className="iconShowInputWindow"
                               glyph={this.state.showInput ? "chevron-up" : "chevron-down"}
                               onClick={this.toggleShowInput}/>
                    { this.state.showInput ? <EditTextForm num={this.props.num}/> : null }
                </div>
            </div>
        );
    }
}