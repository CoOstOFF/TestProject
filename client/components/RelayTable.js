import React from 'react';
import Relay from 'react-relay';
import * as Constants from '../constants'
import {Button} from 'react-bootstrap'
import {Column, Table, AutoSizer, WindowScroller} from 'react-virtualized';

class RelayTable extends React.Component {

    onReload = () => {
        this.props.relay.forceFetch();
    };

    handleCountChange = (e) => {
        this.props.relay.setVariables({
            first: e.target.value
                ? parseInt(e.target.value, 10)
                : 0,
        });
    };

    render() {
        let data = this.props.getWorkplacesRelay.workplaces.edges.map(edge => {
            return edge.node
        });
        let row = data.reduce(function (prev, curr) {
            return Object.keys(prev).length > Object.keys(curr).length ? prev : curr;
        });
        let columns = Object.keys(row);
        var {first} = this.props.relay.variables;

        return (
            <div style={{margin: 10}}>
                <Button
                    id="reload_button"
                    bsStyle="primary"
                    bsSize="small"
                    type="button"
                    style={{
                        borderColor: "#222222",
                        backgroundColor: "#222222"
                    }}
                    onClick={this.onReload}>
                    Force Fetch
                </Button>
                <input
                    onChange={this.handleCountChange}
                    min="1"
                    style={{marginLeft: 20, width: 44}}
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
                                            if (value != '__dataID__') {
                                                return (
                                                    <Column
                                                        key={columnIndex}
                                                        label={value}
                                                        dataKey={value}
                                                        width={width / columns.length}
                                                    />
                                                )
                                            }
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
          workplaces(first: $first){
            edges{
              node{
                name,
                address
              },
            },
          },
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





