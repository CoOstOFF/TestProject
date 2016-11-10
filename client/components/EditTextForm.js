import React from 'react';
import {
    Button,
    ControlLabel,
    FormGroup,
    FormControl
}from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Constants from '../constants';
import {addForm, getData} from '../actions/app-actions'

class MyEditTextForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 0,
            inputValue: '',
            queryType: Constants.GRAPHQL_QUERY
        };
    }

    onChangeInputHandler = (e) => {
        this.setState({inputValue: e.target.value});
    };

    onChangeSelectHandler = (e) => {
        this.setState({queryType: e.target.value});
    };

    onClickSubmitHandler = (e) => {
        e.preventDefault();
        let key = this.state.key;
        let form = {
            key: key,
            data: [],
            layoutParams: {
                i: key.toString(),
                minH: 6,
                minW: 4,
                x: 4,
                y: 1,
                w: 9,
                h: 8
            },
            isTurned: false,
            error: null,
            queryType: Constants.GRAPHQL_QUERY,
            query: ""
        };
        const {addForm, getData} = this.props.appActions;
        addForm(form);
        getData(key, this.state.inputValue, this.state.queryType);
        this.setState({key: key + 1});
    };

    onClickClearFormHandler = (e) => {
        e.preventDefault();
        this.setState({inputValue: ''});
    };

    render() {
        return (
            <div>
                <form>
                    <FormGroup>
                        <FormControl
                            componentClass="textarea"
                            rows="5"
                            placeholder="Input your query here..."
                            value={this.state.inputValue}
                            onChange={this.onChangeInputHandler}/>
                        <ControlLabel>Select query type:</ControlLabel>
                        <FormControl componentClass="select" onChange={this.onChangeSelectHandler}>
                            <option value={Constants.GRAPHQL_QUERY}>GraphQL query</option>
                            <option value={Constants.SQL_QUERY}>SQL query</option>
                        </FormControl>
                    </FormGroup>
                    <Button
                        id="submit_button"
                        bsStyle="primary"
                        type="button"
                        style={{
                            borderColor: "#222222",
                            backgroundColor: "#222222",
                            fontColor: "#888888"
                        }}
                        onClick={this.onClickSubmitHandler}
                        disabled={!this.state.inputValue}>
                        Submit
                    </Button>
                    <Button
                        id="clear_form_button"
                        bsStyle="danger"
                        type="reset"
                        style={{
                            marginLeft: '10px'
                        }}
                        onClick={this.onClickClearFormHandler}>
                        Clear form
                    </Button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators({addForm, getData}, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(MyEditTextForm)