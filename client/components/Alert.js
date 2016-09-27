import React from 'react';
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap';

class MyAlert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {alertVisible: false};
    }

    handleAlertDismiss = () => {
        this.setState({alertVisible: false});
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.error)
            this.setState({alertVisible: true});
    };

    render() {
        if (this.state.alertVisible) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} style={{
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    <h4>Oh snap! You got an error!</h4>
                    <p>{this.props.error.message}</p>
                </Alert>
            );
        }
        return null;

    }
}

function mapStateToProps(state) {
    return {
        error: state.error
    }
}

export default connect(mapStateToProps)(MyAlert)