import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'reactable';

class MyTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false}
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({visible: nextProps.data.length});
    };

    render() {
        return (
            <div style={{
                display: this.state.visible ? 'block' : 'none',
                marginLeft: 10,
                marginRight: 10,
                overflow: 'auto'
            }}>
                <Table className="table" data={this.props.data}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}
export default connect(mapStateToProps)(MyTable)
