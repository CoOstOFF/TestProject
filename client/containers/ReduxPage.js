import React from 'react';
import List from '../components/List'
import Alert from '../components/Alert'
import Table from '../components/Table'
import EditTextForm from '../components/EditTextForm'
import {Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {addForm, getData, deleteForm, turnForm, updateFormsLayout} from '../actions/app-actions'
import * as Constants from '../constants';
import ReactGridLayout, {WidthProvider} from 'react-grid-layout';
const DecoratedReactGridLayout = WidthProvider(ReactGridLayout);

class ReduxPage extends React.Component {

    componentDidMount = () => {
        let {addForm, getData} = this.props.appActions;
        addForm({
            key: Constants.TABLE_LIST_FORM,
            data: [],
            layoutParams: {
                i: Constants.TABLE_LIST_FORM,
                minH: 6,
                minW: 3,
                x: 0,
                y: Infinity,
                w: 3,
                h: 10
            },
            isMinimized: false,
            error: null,
            queryType: Constants.SQL_QUERY,
            query: ""
        });
        getData(Constants.TABLE_LIST_FORM, "select rdb$relation_name from rdb$relations where rdb$view_blr is null and (rdb$system_flag is null or rdb$system_flag = 0);", Constants.SQL_QUERY);
    };

    onClickCloseHandler = (key) => {
        const {deleteForm} = this.props.appActions;
        deleteForm(this.props.forms[key.toString()]);
    };

    onClickMinimizeHandler = (key) => {
        const {turnForm} = this.props.appActions;
        let form = {...this.props.forms[key.toString()]};
        form.isMinimized = true;
        turnForm(form);
    };

    onClickReturnHandler = (key) => {
        const {turnForm} = this.props.appActions;
        let form = {...this.props.forms[key.toString()]};
        form.isMinimized = false;
        turnForm(form);
    };

    render() {
        var formsArray = [];
        var formsMinimizedArray = [];
        let forms = this.props.forms;
        const {updateFormsLayout} = this.props.appActions;

        for (let key in forms) {
            if (forms.hasOwnProperty(key)) {
                if (key != (Constants.TABLE_LIST_FORM) && key != (Constants.INPUT_FORM)) {
                    formsArray.push(
                        <div
                            className="card"
                            data-grid={forms[key].layoutParams}
                            key={key.toString()}
                            style={{
                                display: forms[key.toString()].isMinimized ? "none" : "inline"
                            }}>
                            <div style={{
                                backgroundColor: "#EFEFEF",
                                textAlign: "left",
                                borderBottom: "2px #DDDDDD solid",
                                height: Constants.TOOLBAR_HEIGHT,
                                borderTopLeftRadius: 2,
                                borderTopRightRadius: 2
                            }}>
                                <Glyphicon className="iconToolbarForm iconToolbarFormClose"
                                           style={{lineHeight: "30px"}}
                                           onClick={() => {
                                               this.onClickCloseHandler(key)
                                           }} glyph="remove"/>
                                <Glyphicon className="iconToolbarForm iconToolbarFormMinimize"
                                           style={{lineHeight: "30px"}}
                                           onClick={() => {
                                               this.onClickMinimizeHandler(key)
                                           }}
                                           glyph="option-horizontal"/>
                                <span style={{
                                    color: "#757575",
                                    lineHeight: "30px",
                                    fontSize: 15,
                                    marginLeft: 10
                                }}>Form {key.toString()}</span>
                            </div>
                            <Alert error={forms[key.toString()].error} style={{margin: 10}} num={key}/>
                            <Table data={forms[key.toString()].data}/>
                        </div>
                    );
                }
            }
        }

        for (let key in forms) {
            if (forms.hasOwnProperty(key)) {
                if (forms[key.toString()].isMinimized == true) {
                    if (key != (Constants.TABLE_LIST_FORM) && key != (Constants.INPUT_FORM)) {
                        formsMinimizedArray.push(
                            <div style={{
                                float: "left",
                                borderRight: "1px #909090 solid"
                            }}>
                                <span
                                    className="iconTaskBarGrid" onClick={() => {
                                    this.onClickReturnHandler(key)
                                }}
                                    style={{lineHeight: "42px"}}
                                    id={"return_form_button" + key.toString()}>
                                    Form {key.toString()}
                                </span>
                                <Glyphicon
                                    className="iconTaskBarGrid"
                                    style={{lineHeight: "42px"}}
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
                backgroundColor: "#E2E1E0",
                marginTop: 50
            }}>

                {/* Grid */}

                <DecoratedReactGridLayout
                    className="layout"
                    cols={12}
                    containerPadding={[5, 5]}
                    margin={[15, 15]}
                    rowHeight={42}
                    onResizeStop={(layout)=> {
                        updateFormsLayout(layout);
                    }}
                    onDragStop={(layout)=> {
                        updateFormsLayout(layout);
                    }}>

                    {/* TaskBar */}

                    <div
                        className="card"
                        key={Constants.TASK_BAR_FORM}
                        data-grid={{i: Constants.TASK_BAR_FORM, x: 0, y: 0, w: 12, h: 1, static: true}}>
                        <div>

                            {/* Forms-Minimized */}

                            {formsMinimizedArray.map((item) => item)}

                        </div>
                    </div>

                    {/* TableList */}

                    <div className="card"
                         key={Constants.TABLE_LIST_FORM}
                         data-grid={{
                             i: Constants.TABLE_LIST_FORM,
                             minH: 6,
                             minW: 3,
                             x: 0,
                             y: 6,
                             w: 3,
                             h: 10
                         }}>
                        <List/>
                    </div>

                    {/* InputForm */}

                    <div className="card"
                         key={Constants.INPUT_FORM}
                         data-grid={{
                             i: Constants.INPUT_FORM,
                             minH: 5,
                             minW: 3,
                             x: 0,
                             y: 0,
                             w: 3,
                             h: 5
                         }}>
                        <div style={{margin: 10}}>
                            <EditTextForm />
                        </div>
                    </div>

                    {/* Forms-Windows */}

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