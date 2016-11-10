import React from 'react';
import {List, AutoSizer} from 'react-virtualized';
import {Glyphicon} from 'react-bootstrap'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as Constants from '../constants';
import {addForm, getData, deleteTable} from '../actions/app-actions'

export default class MyList extends React.Component {

    itemClickHandler = (tableName) => {
        let {addForm, getData} = this.props.appActions;
        let form = {
            key: tableName,
            data: [],
            layoutParams: {
                i: tableName,
                minH: 6,
                minW: 4,
                x: 4,
                y: 1,
                w: 9,
                h: 8
            },
            isTurned: false,
            error: null,
            queryType: Constants.SQL_QUERY,
            query: "select * from " + tableName
        };
        addForm(form);
        getData(tableName, "select * from " + tableName, Constants.SQL_QUERY);
    };

    itemDeleteTableClickHandler = (tableName) => {
        let {deleteTable} = this.props.appActions;
        if (confirm("Do you want to delete table " + tableName)) {
            deleteTable(tableName);
            alert("Table " + tableName + " deleted")
        } else alert("Cancelled");
        this.forceUpdate();
    };

    rowRenderer = ({key, index, style}) => {
        let data;
        let {forms} = this.props;
        data = forms[Constants.TABLE_LIST_FORM] ? this.props.forms[Constants.TABLE_LIST_FORM].data : [];
        return (
            <div className="listItem" key={key} style={style}
                 onClick={() => this.itemClickHandler(data[index]["RDB$RELATION_NAME"])}>
                <Glyphicon className="iconDeleteTableList" glyph="trash"
                           onClick={() => this.itemDeleteTableClickHandler(data[index]["RDB$RELATION_NAME"])}/>
                <span style={{marginLeft: 15}}>{data[index]["RDB$RELATION_NAME"]}</span>
            </div>
        )
    };

    render() {
        let data;
        let {forms} = this.props;
        data = forms[Constants.TABLE_LIST_FORM] ? this.props.forms[Constants.TABLE_LIST_FORM].data : [];

        return (
            <AutoSizer>
                {({height, width}) => {
                    return (
                        <List
                            width={width}
                            height={height}
                            rowCount={data.length}
                            rowHeight={Constants.ROW_HEIGHT}
                            rowRenderer={this.rowRenderer}
                        />
                    )
                }}
            </AutoSizer>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators({addForm, getData, deleteTable}, dispatch)
    }
}
function mapStateToProps(state) {
    return {
        forms: state.forms
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyList)