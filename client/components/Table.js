import React from 'react';
import * as Constants from '../constants'
import {Column, Table, AutoSizer} from 'react-virtualized';

export default class MyTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false};
        this.props.socket.emit('user:commit', {
            name: this.props.user
        });
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({visible: nextProps.data.length});
    };

    render() {
        let data = this.props.data;
        let columns;
        if (this.state.visible) {
            let row = data.reduce(function (prev, curr) {
                return Object.keys(prev).length > Object.keys(curr).length ? prev : curr;
            });
            columns = Object.keys(row);
        }

        if (this.state.visible) {
            return (
                <AutoSizer>
                    {({height, width}) => {
                        return (
                            <Table
                                width={width}
                                height={height - Constants.TOOLBAR_HEIGHT}
                                headerHeight={Constants.HEADER_HEIGHT}
                                rowCount={data.length}
                                noRowsRenderer={() => {
                                    return (
                                        <div>
                                            <span>NO DATA</span>
                                        </div>
                                    );
                                }}
                                rowHeight={Constants.ROW_HEIGHT}
                                rowStyle={{
                                    borderBottom: "1px solid #e0e0e0"
                                }}
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
                        )
                    }}
                </AutoSizer>
            )
        }
        return null;
    }
}