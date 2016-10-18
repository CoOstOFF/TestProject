import React from 'react';
import Relay from 'react-relay';
import * as Constants from '../constants'
import {Column, Table, AutoSizer, WindowScroller} from 'react-virtualized';

class RelayTable extends React.Component {

    _handleCountChange = (e) => {
        this.props.relay.setVariables({
            first: e.target.value
                ? parseInt(e.target.value, 10)
                : 0,
        });
    };

    render() {
        let data = this.props.getWorkplacesRelay.workplaces;
        let row = data.reduce(function (prev, curr) {
            return Object.keys(prev).length > Object.keys(curr).length ? prev : curr;
        });
        let columns = Object.keys(row);
        var {first} = this.props.relay.variables;

        return (
            <div style={{margin: 10}}>
                <input
                    onChange={this._handleCountChange}
                    min="1"
                    style={{width: 44}}
                    type="number"
                    value={first}
                />
                <WindowScroller>
                    {({height, isScrolling, scrollTop}) => (
                        <AutoSizer disableHeight>
                            {({width}) => (
                                <Table
                                    autoHeight
                                    headerHeight={Constants.HEADER_HEIGHT}
                                    width={width}
                                    rowStyle={{borderBottom: "1px solid #e0e0e0"}}
                                    height={height}
                                    rowCount={data.length}
                                    scrollTop={scrollTop}
                                    rowHeight={Constants.ROW_HEIGHT}
                                    rowGetter={({index}) => data[index]}>
                                    {
                                        columns.map((value, columnIndex, arr) => {
                                            return (
                                                <Column
                                                    key={columnIndex}
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
}

var RelayTableContainer = Relay.createContainer(RelayTable, {
    initialVariables: {
        first: 10
    },
    fragments: {
        getWorkplacesRelay: () => Relay.QL`
        fragment on Lists{
        workplaces(first: $first){name, address}
        }`
    },
});

class RelayTableRoute extends Relay.Route {
    static routeName = 'RelayTableRoute';
    static queries = {
        getWorkplacesRelay: (Component) => Relay.QL`
      query {
        getWorkplacesRelay { ${Component.getFragment('getWorkplacesRelay')} },
      }
    `,
    };
}

export default <Relay.RootContainer
    Component={RelayTableContainer}
    route={new RelayTableRoute()}
/>;





