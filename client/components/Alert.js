import React from 'react';
import {Alert} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {removeError} from '../actions/app-actions'

export default class MyAlert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false};
    }

    handleAlertDismiss = () => {
        const {removeError} = this.props.appActions;
        removeError(this.props.num);
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

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators({removeError}, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(MyAlert)