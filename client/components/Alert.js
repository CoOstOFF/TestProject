import React from 'react';
import {Alert} from 'react-bootstrap';

export default class MyAlert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false};
    }

    handleAlertDismiss = () => {
        this.setState({visible: false});
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({visible: nextProps.error});
    };

    render() {
        if (this.state.visible) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                    <h4>Oh snap! You got an error!</h4>
                    <p>{this.props.error.message}</p>
                </Alert>
            );
        }
        return null;

    }
}