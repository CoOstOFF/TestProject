import React from 'react';
import {Table} from 'reactable';
export default class MyTable extends React.Component {
    render() {
        return (<Table className="table" noDataText="No matching records found." data={this.props.data}/>);
    }
}
