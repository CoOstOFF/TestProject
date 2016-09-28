import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {ProgressBar} from 'react-bootstrap';

class MyProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: false}
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({visible: nextProps.fetching});
    };

    render() {
        return (<Modal show={this.state.visible}>
                <ProgressBar active now={100} style={{
                    margin: 20,
                    height: 25
                }}/>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        fetching: state.fetching
    }
}

export default connect(mapStateToProps)(MyProgressBar)