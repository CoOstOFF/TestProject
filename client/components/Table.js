import React from 'react';
import {connect} from 'react-redux'
import {Table} from 'reactable';

function mapStateToProps(state) {
    return {
        data: state.data
    }
}
export default connect(mapStateToProps)(Table)
