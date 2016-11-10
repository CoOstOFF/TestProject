import React from 'react';
import Window from '../components/Window'
import List from '../components/List'
import {Button, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {addForm, getData, deleteForm, turnForm, updateFormsLayout} from '../actions/app-actions'
import * as Constants from '../constants';
import ReactGridLayout, {WidthProvider} from 'react-grid-layout';
const DecoratedReactGridLayout = WidthProvider(ReactGridLayout);

class ReduxPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {key: 0};
    }

    componentDidMount = () => {
        let {addForm, getData} = this.props.appActions;
        addForm({
            key: 'tableList',
            data: [],
            layoutParams: {
                i: 'tableList',
                minH: 6,
                minW: 3,
                x: 0,
                y: 1,
                w: 3,
                h: 15
            },
            isTurned: false,
            error: null,
            queryType: Constants.SQL_QUERY,
            query: ""
        });
        getData('tableList', "select rdb$relation_name from rdb$relations where rdb$view_blr is null and (rdb$system_flag is null or rdb$system_flag = 0);", Constants.SQL_QUERY);
    };

    onClickAddFormHandler = () => {
        let key = this.state.key;
        let form = {
            key: key,
            data: [],
            layoutParams: {
                i: key.toString(),
                minH: 6,
                minW: 4,
                x: 3,
                y: 0,
                w: 6,
                h: 6
            },
            isTurned: false,
            error: null,
            queryType: Constants.GRAPHQL_QUERY,
            query: ""
        };
        const {addForm} = this.props.appActions;
        addForm(form);
        this.setState({key: key + 1});
    };

    onClickCloseHandler = (key) => {
        const {deleteForm} = this.props.appActions;
        deleteForm(this.props.forms[key.toString()]);
    };

    onClickTurnHandler = (key) => {
        const {turnForm} = this.props.appActions;
        let form = {...this.props.forms[key.toString()]};
        form.isTurned = true;
        turnForm(form);
    };

    onClickReturnHandler = (key) => {
        const {turnForm} = this.props.appActions;
        let form = {...this.props.forms[key.toString()]};
        form.isTurned = false;
        turnForm(form);
    };

    render() {
        var formsArray = [];
        var formsTurnedArray = [];
        let forms = this.props.forms;
        const {updateFormsLayout} = this.props.appActions;

        for (let key in forms) {
            if (forms.hasOwnProperty(key)) {
                if (key != 'tableList') {
                    formsArray.push(
                        <div
                            className="card"
                            data-grid={forms[key].layoutParams}
                            key={key.toString()}
                            style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: 2,
                                display: forms[key.toString()].isTurned ? "none" : "inline"
                            }}>
                            <Window data={forms[key.toString()].data} error={forms[key.toString()].error} num={key}
                                    onCloseClick={() => {
                                        this.onClickCloseHandler(key)
                                    }}
                                    onTurnClick={() => {
                                        this.onClickTurnHandler(key)
                                    }}/>
                        </div>
                    )
                }
            }
        }
        for (let key in forms) {
            if (forms.hasOwnProperty(key)) {
                if (forms[key.toString()].isTurned == true) {
                    if (key != "tableList") {
                        formsTurnedArray.push(
                            <div style={{float: "left"}}>
                                <span
                                    className="iconBarGrid"
                                    id={"return_form_button" + key.toString()}
                                    onClick={() => {
                                        this.onClickReturnHandler(key)
                                    }}>
                                    Form {key.toString()}
                                </span>
                                <Glyphicon
                                    className="iconBarGrid"
                                    id={"close_form_button" + key.toString()}
                                    glyph="remove"
                                    onClick={() => {
                                        this.onClickCloseHandler(key)
                                    }}
                                />
                            </div>
                        )
                    }
                }
            }
        }
        return (
            <div style={{
                backgroundColor: "#BDBDBD",
                marginTop: 50
            }}>
                <DecoratedReactGridLayout
                    cols={12}
                    rowHeight={42}
                    onResizeStop={(layout)=> {
                        updateFormsLayout(layout);
                    }}
                    onDragStop={(layout)=> {
                        updateFormsLayout(layout);
                    }}
                    className="layout"
                >
                    <div className="card"
                         key={'toolbar'}
                         data-grid={{i: 'toolbar', x: 0, y: 0, w: 12, h: 1, static: true}}
                         style={{
                             backgroundColor: "#222222",
                             display: "flex",
                             alignItems: "center",
                             borderRadius: 2
                         }}>
                        <Glyphicon className="iconBarGrid" glyph="plus" onClick={this.onClickAddFormHandler}/>
                        <div>
                            {formsTurnedArray.map((item) => item)}
                        </div>
                    </div>
                    <div className="card"
                         style={{
                             backgroundColor: "#FFFFFF",
                             borderRadius: 2,
                             margin: 0,
                             padding: 0
                         }}
                         key={'tableList'}
                         data-grid={{
                             i: 'tableList',
                             minH: 5,
                             minW: 3,
                             x: 0,
                             y: 1,
                             w: 3,
                             h: 15
                         }}>
                        <List/>
                    </div>
                    {formsArray.map((item) => item)}
                </DecoratedReactGridLayout>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators({addForm, getData, deleteForm, turnForm, updateFormsLayout}, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        forms: state.forms
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage)