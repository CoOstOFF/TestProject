import React from 'react';
import Window from '../components/Window'
import {Button, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {addForm, deleteForm, turnForm, updateFormsLayout} from '../actions/app-actions'
import * as Constants from '../constants';
import ReactGridLayout, {WidthProvider} from 'react-grid-layout';
const DecoratedReactGridLayout = WidthProvider(ReactGridLayout);

class ReduxPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {key: 0};
    }

    onClickAddFormHandler = () => {
        let key = this.state.key;
        let form = {
            key: key,
            data: [],
            layoutParams: {
                i: key.toString(),
                minH: 5,
                minW: 4,
                x: 0,
                y: 0,
                w: 6,
                h: 5
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
                formsArray.push(
                    <div
                        className="card"
                        data-grid={forms[key].layoutParams}
                        key={key.toString()}
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 3,
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
        for (let key in forms) {
            if (forms.hasOwnProperty(key)) {
                if (forms[key.toString()].isTurned == true) {
                    formsTurnedArray.push(
                        <div style={{float: "left"}}>
                            <Button
                                id={"return_form_button" + key.toString()}
                                type="button"
                                onClick={() => {
                                    this.onClickReturnHandler(key)
                                }}
                                style={{borderColor: "#FFFFFF", borderRadius: 0, borderLeft: "solid 1px #DDDDDD"}}>
                                Form №{key.toString()}
                            </Button>
                            <Button
                                id={"close_form_button" + key.toString()}
                                type="button"
                                onClick={() => {
                                    this.onClickCloseHandler(key)
                                }}
                                style={{borderColor: "#FFFFFF"}}>
                                <Glyphicon glyph="remove"/>
                            </Button>
                        </div>
                    )
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
                             padding: 1,
                             backgroundColor: "#FFFFFF",
                             display: "flex",
                             alignItems: "center",
                             borderRadius: 3
                         }}>
                        <Button
                            id="add_form_button"
                            type="button"
                            style={{
                                marginLeft: 5, marginRight: 5, borderColor: "#DDDDDD",
                                backgroundColor: "#DDDDDD"
                            }}
                            onClick={this.onClickAddFormHandler}>
                            Add form
                        </Button>
                        <div>
                            {formsTurnedArray.map((item) => item)}
                        </div>
                    </div>
                    {formsArray.map((item) => item)}
                </DecoratedReactGridLayout>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators({addForm, deleteForm, turnForm, updateFormsLayout}, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        forms: state.forms
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage)