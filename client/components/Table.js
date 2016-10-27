import React from 'react';
import * as Constants from '../constants'
import {Column, Table, AutoSizer} from 'react-virtualized';

export  default class MyTable extends React.Component {

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
                <div style={{marginBottom: 10}}>
                    <AutoSizer disableHeight>
                        {({width}) => (
                            <Table
                                headerHeight={Constants.HEADER_HEIGHT}
                                width={width}
                                rowStyle={{
                                    borderBottom: "1px solid #e0e0e0"
                                }}
                                height={data.length > 20 ? 500 : Constants.ROW_HEIGHT * data.length + Constants.HEADER_HEIGHT}
                                rowCount={data.length}
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
                </div>
            )
        }
        return null;
    }
}