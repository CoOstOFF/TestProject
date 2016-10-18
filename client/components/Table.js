import React from 'react';
import {connect} from 'react-redux';
import * as Constants from '../constants'
import {Column, Table, AutoSizer, WindowScroller} from 'react-virtualized';

class MyTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false}
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({visible: nextProps.data.length});
    };


    render() {
        let data = this.props.data;
        if (this.state.visible) {
            let row = data.reduce(function (prev, curr) {
                return Object.keys(prev).length > Object.keys(curr).length ? prev : curr;
            });
            var columns = Object.keys(row);
        }

        if (this.state.visible) {
            return (
                <div style={{margin: 10}}>
                    <WindowScroller>
                        {({height, isScrolling, scrollTop}) => (
                            <AutoSizer disableHeight>
                                {({width}) => (
                                    <Table
                                        autoHeight
                                        headerHeight={Constants.HEADER_HEIGHT}
                                        width={width}
                                        rowStyle={{
                                            borderBottom: "1px solid #e0e0e0"
                                        }}
                                        height={height}
                                        rowCount={data.length}
                                        scrollTop={scrollTop}
                                        rowHeight={Constants.ROW_HEIGHT}
                                        rowGetter={({index}) => data[index]}>
                                        {
                                            columns.map((value, i, arr) => {
                                                return (
                                                    <Column
                                                        key={i}
                                                        label={value}
                                                        dataKey={value}
                                                        width={width / columns.length}
                                                    />
                                                )
                                            })
                                        }
                                    </Table>
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                </div>
            )
        }
        return null;
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}
export default connect(mapStateToProps)(MyTable)
