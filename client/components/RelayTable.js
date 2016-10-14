import React from 'react';
import Relay from 'react-relay';
import {Table} from 'reactable';

class RelayTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false};
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
                marginBottom: 10,
                overflow: 'auto'
            }}>
                <Table className="table" data={this.props.data}/>
            </div>
        )
    }
}

var RelayTableContainer = Relay.createContainer(RelayTable, {
    fragments: {
        getWorkplaces: () => Relay.QL`
        fragment on  Workplace{
        _id, name
        }`
    },
});

class RelayTableRoute extends Relay.Route {
    static routeName = 'RelayTableRoute';
    static queries = {
        getWorkplaces: (Component) => Relay.QL`
      query getWorkplaces {
        getWorkplaces { ${Component.getFragment('getWorkplaces')} },
      }
    `,
    };
}

export default <Relay.RootContainer
    Component={RelayTableContainer}
    route={new RelayTableRoute()}
/>;





